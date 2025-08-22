import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRegularProgramTables16800000000036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scheduled_program',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'scheduledDay', type: 'varchar', isNullable: true },
          { name: 'startTime', type: 'time', isNullable: false },
          { name: 'endTime', type: 'time', isNullable: false },
          { name: 'location', type: 'varchar', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'icon', type: 'varchar', isNullable: true },
          { name: 'image', type: 'varchar', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('scheduled_program');
  }
}
