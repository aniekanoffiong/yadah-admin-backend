import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateConfigFieldTable16800000000032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'config_field',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'entityName', type: 'varchar', isNullable: false },
          { name: 'subEntityName', type: 'varchar', isNullable: true },
          { name: 'fieldName', type: 'varchar', isNullable: false },
          { name: 'label', type: 'varchar', isNullable: false },
          { name: 'fieldType', type: 'varchar', isNullable: false },
          { name: 'optionsJson', type: 'text', isNullable: true },
          { name: 'editable', type: 'boolean', default: true },
          { name: 'validationRulesJson', type: 'text', isNullable: true },
          { name: 'displayOrder', type: 'int', default: 0 },
          { name: 'multipleOccurrence', type: 'boolean', default: false },
          { name: 'maxOccurrence', type: 'int', isNullable: true },
          { name: 'helpText', type: 'text', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
        ],
      }),
      true
    );

    await queryRunner.query(`CREATE INDEX "IDX_entityName" ON "public"."config_field" ("entityName")`);
    await queryRunner.query(`CREATE INDEX "IDX_subEntityName" ON "public"."config_field" ("subEntityName")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('config_field');
  }
}
