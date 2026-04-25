import express, { Request, Response } from 'express';
import Course from '../models/Courses';

const router = express.Router();

// CREATE — POST /api/courses
router.post('/', async (req: Request, res: Response) => {
    try {
        const course = new Course(req.body);
        const saved = await course.save();
        res.status(201).json(saved);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL — GET /api/courses
router.get('/', async (req: Request, res: Response) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });
        res.json(courses);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE — GET /api/courses/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE — PUT /api/courses/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updated = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(updated);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE — DELETE /api/courses/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await Course.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ message: 'Course deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;