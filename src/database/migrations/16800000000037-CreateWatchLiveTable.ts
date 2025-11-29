import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateWatchLiveTable16800000000037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'watch_live',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'videoUrl', type: 'varchar', isNullable: false },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'date', type: 'date', isNullable: true },
          { name: 'startTime', type: 'time', isNullable: true },
          { name: 'endTime', type: 'time', isNullable: true },
          { name: 'featured', type: 'boolean', default: false },
          { name: 'isLive', type: 'boolean', default: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createIndex("watch_live", new TableIndex({
      columnNames: ["title"],
      name: "IDX_WATCH_LIVE_TITLE",
    }));

    await queryRunner.createIndex("watch_live", new TableIndex({
      columnNames: ["featured", "isLive"],
      name: "IDX_WATCH_LIVE_FEATURED_IS_LIVE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('live');
  }
}
