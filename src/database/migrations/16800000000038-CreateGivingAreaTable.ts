import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGivingAreaTable16800000000038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'giving_area',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'icon', type: 'varchar', isNullable: false },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'description', type: 'varchar', isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('giving_area');
  }
}
