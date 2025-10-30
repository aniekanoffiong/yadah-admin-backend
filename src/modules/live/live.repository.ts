import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source';
import { Live } from './live.entity';

export class LiveRepository {
  private liveRepo: Repository<Live>;

  constructor() {
    this.liveRepo = AppDataSource.getRepository(Live);
  }

  async featuredLive(): Promise<Live | null> {
    return await this.liveRepo.findOne({ where: { featured: true }});
  }

  async latestLive(): Promise<Live> {
    let latestLive = await this.featuredLive()
    if (!latestLive) {
      latestLive = await this.liveRepo
        .createQueryBuilder("live")
        .orderBy("date", "DESC")
        .getOne();
    }
    if (!latestLive) throw Error("Cannot find live")
    return latestLive
  }

  async findAll(): Promise<Live[]> {
    return this.liveRepo.find();
  }

  async findOne(id: number): Promise<Live | null> {
    return this.liveRepo.findOne({ where: { id }, relations: ['activities'] });
  }

  async findRecent(limit: number): Promise<Live[]> {
    // Get the latest row for each title, then order those by date desc and apply limit
    const sql = `
      SELECT *
      FROM (
        SELECT DISTINCT ON (title) *
        FROM "watch_live"
        ORDER BY title, date DESC
      ) t
      ORDER BY t.date DESC
      LIMIT $1
    `;
    const rows = await this.liveRepo.query(sql, [limit]);
    return rows.map((r: any) => this.liveRepo.create(r));
  }

  async save(live: Live): Promise<Live> {
    return this.liveRepo.save(live);
  }

  async delete(id: number): Promise<void> {
    await this.liveRepo.delete(id);
  }
}