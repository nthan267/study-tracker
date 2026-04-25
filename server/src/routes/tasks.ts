import express, { Request, Response } from 'express';
import Task from '../models/Task';

const router = express.Router();

// CREATE — POST /api/tasks
router.post('/', async (req: Request, res: Response) => {
    try {
        const task = new Task(req.body);
        const saved = await task.save();
        res.status(201).json(saved);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL — GET /api/tasks
// Optional filter by course: GET /api/tasks?courseId=xxx
router.get('/', async (req: Request, res: Response) => {
    try {
        const filter: any = {};
        if (req.query.courseId) filter.courseId = req.query.courseId;
        const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 });
        res.json(tasks);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE — GET /api/tasks/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE — PUT /api/tasks/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updated);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE — DELETE /api/tasks/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await Task.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;