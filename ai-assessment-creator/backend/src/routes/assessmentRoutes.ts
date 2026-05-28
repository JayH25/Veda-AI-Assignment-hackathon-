import { Router, Request, Response } from 'express';
import { assessmentQueue } from '../queue/assessmentQueue';
import { Assignment, QuestionPaper } from '../models/Assignment';
import { generateQuestionPaper } from '../services/aiService';
import { io } from '../server';

const router = Router();

// Fallback logic for when Redis is unavailable (Hackathon Resilience)
const processDirectly = async (assignmentId: string, formData: any) => {
    try {
        console.log(`[Fallback] Processing assignment ${assignmentId} directly without Redis`);
        const jsonStr = await generateQuestionPaper(formData);
        const parsedData = JSON.parse(jsonStr);
        
        const newQuestionPaper = new QuestionPaper({
            assignmentId,
            ...parsedData
        });
        
        await newQuestionPaper.save();
        await Assignment.findByIdAndUpdate(assignmentId, { status: 'completed' });
        
        // Notify frontend via Socket.io
        io.emit('assignment-status', { 
            assignmentId, 
            status: 'completed' 
        });
        
        console.log(`[Fallback] Successfully processed assignment ${assignmentId}`);
    } catch (error) {
        console.error(`[Fallback] Failed to process ${assignmentId}:`, error);
        await Assignment.findByIdAndUpdate(assignmentId, { status: 'failed' });
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
        const assignment = new Assignment({
            title: formData.title || 'Untitled Assessment',
            subject: formData.subject || 'General Knowledge',
            dueDate: formData.dueDate,
            totalMarks: formData.totalMarks,
            totalQuestions: formData.totalQuestions,
            status: 'pending',
        });
        
        // Save to MongoDB
        await assignment.save();
        
        // 2. Try to dispatch to BullMQ (preferred)
        try {
            await assessmentQueue.add('generate-assessment-job', {
                assignmentId: assignment._id,
                formData
            });
            console.log('Assessment queued in Redis.');
        } catch (queueError) {
            console.warn('Redis queue failed, falling back to direct processing:', queueError.message);
            // Non-blocking direct processing
            processDirectly(assignment._id.toString(), formData);
        }
        
        // 3. Immediately return status 202 (Accepted)
        res.status(202).json({
            message: 'Assessment generation has been started.',
            assignmentId: assignment._id
        });
        
    } catch (error) {
        console.error('Error in assessment creation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Fetch a specific assignment by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // 1. Look up the assignment in MongoDB
        const assignment = await Assignment.findById(id).lean();

        // 2. If it doesn't exist, return a 404
        if (!assignment) {
             res.status(404).json({ error: 'Assignment not found' });
             return;
        }

        // 3. Fetch the linked question papers
        const questionPapers = await QuestionPaper.find({ assignmentId: id }).lean();

        // 4. Return combined data
        res.status(200).json({
            ...assignment,
            questionPapers
        });
        
    } catch (error) {
        console.error('Error fetching assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;