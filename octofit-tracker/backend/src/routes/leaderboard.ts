import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find()
      .populate('user', '-password')
      .sort({ score: -1 });
    // Assign rank based on sorted order
    const ranked = entries.map((entry, index) => ({
      ...entry.toObject(),
      rank: index + 1,
    }));
    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

router.post('/', async (req, res) => {
  try {
    const entry = new LeaderboardEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', '-password');
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json(entry);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
    res.json({ message: 'Leaderboard entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' });
  }
});

export default router;
