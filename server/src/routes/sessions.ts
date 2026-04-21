import express, { Request, Response } from 'express';
import StudySession from '../models/StudySessions';

const router = express.Router();

// CREATE — POST /api/sessions
router.post('/', async (req: Request, res: Response) => {
    try {
        const session = new StudySession(req.body);
        const saved = await session.save();
        res.status(201).json(saved);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL — GET /api/sessions
router.get('/', async (req: Request, res: Response) => {
    try {
        const sessions = await StudySession.find().sort({ date: -1 });
        res.json(sessions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE — GET /api/sessions/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const session = await StudySession.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(session);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE — PUT /api/sessions/:id
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updated = await StudySession.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json(updated);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE — DELETE /api/sessions/:id
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deleted = await StudySession.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Session not found' });
        }
        res.json({ message: 'Session deleted' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;