import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWatchLiveTable16800000000037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'watch_live',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'videoId', type: 'varchar', isNullable: false },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'date', type: 'date', isNullable: true },
          { name: 'startTime', type: 'time', isNullable: false },
          { name: 'endTime', type: 'time', isNullable: false },
          { name: 'isLive', type: 'boolean', default: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('live');
  }
}
