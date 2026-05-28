import { Router, Request, Response } from 'express';
import { assessmentQueue } from '../queue/assessmentQueue';
import { Assignment } from '../models/Assignment';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        
        // 1. Create a new Assignment mapping ALL the fields
        const assignment = new Assignment({
            title: formData.title || 'Untitled Assessment',
            dueDate: formData.dueDate,
            totalMarks: formData.totalMarks,
            totalQuestions: formData.totalQuestions,
            status: 'pending',
        });
        
        // Save to MongoDB
        await assignment.save();
        
        // 2. Dispatch a Job to the BullMQ queue
        await assessmentQueue.add('generate-assessment-job', {
            assignmentId: assignment._id,
            formData
        });
        
        // 3. Immediately return status 202 (Accepted)
        res.status(202).json({
            message: 'Assessment generation has been queued successfully.',
            assignmentId: assignment._id
        });
        
    } catch (error) {
        // This will print the EXACT reason it failed to your first terminal!
        console.error('Error queuing assignment generation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Fetch a specific assignment by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // 1. Look up the assignment in MongoDB
        const assignment = await Assignment.findById(id);

        // 2. If it doesn't exist, return a 404
        if (!assignment) {
             res.status(404).json({ error: 'Assignment not found' });
             return;
        }

        // 3. If it exists, send the whole document back to the frontend!
        res.status(200).json(assignment);
        
    } catch (error) {
        console.error('Error fetching assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;