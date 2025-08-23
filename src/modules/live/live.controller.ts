import { Request, Response } from 'express';
import { LiveService } from './live.service';

export class LiveController {
  private liveService: LiveService;

  constructor(liveService?: LiveService) {
    this.liveService = liveService || new LiveService();
  }

  async getAll(_req: Request, res: Response) {
    try {
      const lives = await this.liveService.getAll();
      res.json(lives);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve live records' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const live = await this.liveService.getById(id);
      if (live) {
        res.json(live);
      } else {
        res.status(404).json({ message: 'Live record not found' });
      }
    } catch {
      res.status(400).json({ message: 'Invalid ID' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const liveData = req.body;
      const live = await this.liveService.create(liveData);
      // Optionally, notify frontend about new live record using SSE or other method
      res.status(201).json(live);
    } catch {
      res.status(400).json({ message: 'Failed to create live record' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const liveData = req.body;
      const updated = await this.liveService.update(id, liveData);
      if (updated) {
        res.json(updated);
      } else {
        res.status(404).json({ message: 'Live record not found' });
      }
    } catch {
      res.status(400).json({ message: 'Failed to update live record' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.liveService.delete(id);
      res.sendStatus(204);
    } catch {
      res.status(400).json({ message: 'Failed to delete live record' });
    }
  }
}
