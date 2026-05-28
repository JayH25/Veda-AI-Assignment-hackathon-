import mongoose from 'mongoose';
import { Router, Request, Response } from 'express';
import { assessmentQueue } from '../queue/assessmentQueue';
import { Assignment, QuestionPaper } from '../models/Assignment';
import { generateQuestionPaper } from '../services/aiService';
import { io } from '../server';
import redisConnection from '../config/redis';

const router = Router();

// Mock persistence for Hackathon demo (if DB fails)
const memoryAssignments: any[] = [];
const memoryPapers: any[] = [];

// Fallback logic for when Redis is unavailable (Hackathon Resilience)
const processDirectly = async (assignmentId: string, formData: any) => {
    try {
        console.log(`[Fallback] Processing assignment ${assignmentId} directly without Redis`);
        const jsonStr = await generateQuestionPaper(formData);
        const parsedData = JSON.parse(jsonStr);
        
        const paperData = {
            assignmentId,
            ...parsedData,
            _id: new mongoose.Types.ObjectId()
        };

        if (mongoose.connection.readyState === 1) {
            const newQuestionPaper = new QuestionPaper(paperData);
            await newQuestionPaper.save();
            await Assignment.findByIdAndUpdate(assignmentId, { status: 'completed' });
        } else {
            // Update memory store
            const index = memoryAssignments.findIndex(a => a._id.toString() === assignmentId);
            if (index !== -1) memoryAssignments[index].status = 'completed';
            memoryPapers.push(paperData);
        }
        
        // Notify frontend via Socket.io
        io.emit('assignment-status', { 
            assignmentId, 
            status: 'completed' 
        });
        
        console.log(`[Fallback] Successfully processed assignment ${assignmentId}`);
    } catch (error: any) {
        console.error(`[Fallback] Failed to process ${assignmentId}:`, error.message);
        if (mongoose.connection.readyState === 1) {
            await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' });
        }
        
        io.emit('assignment-status', { 
            assignmentId, 
            status: 'failed' 
        });
    }
};

router.post('/', async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        
        // 1. Create a new Assignment mapping ALL the fields
        const assignmentData = {
            _id: new mongoose.Types.ObjectId(),
            title: formData.title || 'Untitled Assessment',
            subject: formData.subject || 'General Knowledge',
            dueDate: formData.dueDate,
            totalMarks: formData.totalMarks,
            totalQuestions: formData.totalQuestions,
            status: 'pending',
            createdAt: new Date()
        };

        // Try to save to MongoDB, else use memory
        if (mongoose.connection.readyState === 1) {
            const assignment = new Assignment(assignmentData);
            await assignment.save();
            console.log('Saved to MongoDB');
        } else {
            console.warn('MongoDB NOT connected. Using In-Memory fallback for demo.');
            memoryAssignments.push(assignmentData);
        }
        
        // 2. Try to dispatch to BullMQ (preferred)
        try {
            if (!redisConnection || redisConnection.status !== 'ready') {
                throw new Error('Redis connection is not ready');
            }
            await assessmentQueue.add('generate-assessment-job', {
                assignmentId: assignmentData._id,
                formData
            });
            console.log('Assessment queued in Redis.');
        } catch (queueError: any) {
            console.warn('Redis queue failed, falling back to direct processing:', queueError.message);
            // Non-blocking direct processing
            processDirectly(assignmentData._id.toString(), formData);
        }
        
        // 3. Immediately return status 202 (Accepted)
        res.status(202).json({
            message: 'Assessment generation has been started.',
            assignmentId: assignmentData._id
        });
        
    } catch (error: any) {
        console.error('Error in assessment creation:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            details: error.message 
        });
    }
});
// Fetch a specific assignment by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        let assignment;
        let questionPapers;

        if (mongoose.connection.readyState === 1) {
            assignment = await Assignment.findById(id).lean();
            questionPapers = await QuestionPaper.find({ assignmentId: id }).lean();
        } else {
            assignment = memoryAssignments.find(a => a._id.toString() === id);
            questionPapers = memoryPapers.filter(p => p.assignmentId === id);
        }

        if (!assignment) {
             res.status(404).json({ error: 'Assignment not found' });
             return;
        }

        res.status(200).json({
            ...assignment,
            questionPapers
        });
        
    } catch (error: any) {
        console.error('Error fetching assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;