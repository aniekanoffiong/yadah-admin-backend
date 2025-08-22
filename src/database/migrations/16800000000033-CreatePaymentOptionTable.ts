import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePaymentOptionTable16800000000033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment_option',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'isEnabled', type: 'boolean', default: false },
          { name: 'config', type: 'jsonb', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true
    );

    await queryRunner.query(`CREATE INDEX "IDX_title" ON "public"."payment_option" ("title")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment_option');
  }
}
