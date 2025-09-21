import { Request, Response } from 'express';
import { LiveService } from './live.service';
import { CreateWatchLiveDto, WatchLiveDto } from './live.dto';
import { Live } from './live.entity';
import { format, parse } from 'date-fns';

export class LiveController {
  private liveService: LiveService;

  constructor(liveService?: LiveService) {
    this.liveService = liveService || new LiveService();
  }

  async getAll(_req: Request, res: Response) {
    try {
      const lives = await this.liveService.getAll();
      res.json({ data: lives.map(l => this.toDto(l, this.liveService.extractYoutubeVideoId(l.videoUrl))) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve live records' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const live = await this.liveService.getById(id);
      if (live) {
        res.json({ data: this.toDto(live, this.liveService.extractYoutubeVideoId(live.videoUrl)) });
      } else {
        res.status(404).json({ message: 'Live record not found' });
      }
    } catch {
      res.status(400).json({ message: 'Invalid ID' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const liveData = req.body as CreateWatchLiveDto;
      const live = await this.liveService.create(liveData);
      res.status(201).json(this.toDto(live, this.liveService.extractYoutubeVideoId(live.videoUrl)));
    } catch(err) {
      console.log(err)
      res.status(400).json({ message: 'Failed to create watch live record' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const liveData = req.body;
      const updated = await this.liveService.update(id, liveData);
      if (updated) {
        res.json({ data: this.toDto(updated, this.liveService.extractYoutubeVideoId(liveData.videoUrl)) });
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

  private toDto(live: Live, videoId: string | null): WatchLiveDto {
    return {
      id: live.id,
      videoUrl: live.videoUrl,
      title: live.title,
      date: live.date,
      startTime: live.startTime,
      endTime: live.endTime,
      isLive: live.isLive,
      featured: live.featured,
      videoId,
    }
  }
}
