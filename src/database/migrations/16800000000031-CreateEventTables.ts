import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEventsTableTimestamp16800000000031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'startDate', type: 'timestamp', isNullable: false },
          { name: 'endDate', type: 'timestamp', isNullable: false },
          { name: 'location', type: 'varchar', isNullable: false },
          { name: 'description', type: 'text', isNullable: false },
          { name: 'image', type: 'varchar', isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event');
  }
}
