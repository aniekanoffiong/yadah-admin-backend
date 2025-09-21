import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateConfigFieldTable16800000000032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'config_entity',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'entityName', type: 'varchar', isNullable: false },
          { name: 'multipleOccurrence', type: 'boolean', default: false },
          { name: 'maxOccurrence', type: 'int', isNullable: true },
          { name: 'authorizations', type: 'json', isNullable: true },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'deletedAt', type: 'timestamp', isNullable: true },
          { name: 'parentEntityId', type: 'int', isNullable: true },
        ],
      }),
      true
    );
    
    await queryRunner.createTable(
      new Table({
        name: 'config_entity_field',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'fieldName', type: 'varchar', isNullable: false },
          { name: 'label', type: 'varchar', isNullable: false },
          { name: 'fieldType', type: 'varchar', isNullable: false },
          { name: 'optionsJson', type: 'text', isNullable: true },
          { name: 'editable', type: 'boolean', default: true },
          { name: 'updateEditable', type: 'boolean', default: true },
          { name: 'styling', type: 'text', isNullable: true },
          { name: 'validationRulesJson', type: 'text', isNullable: true },
          { name: 'displayOrder', type: 'int', default: 0 },
          { name: 'helpText', type: 'text', isNullable: true },
          { name: 'multipleOccurrence', type: 'boolean', default: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'configEntityId', type: 'int' },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey("config_entity", new TableForeignKey({
      columnNames: ["parentEntityId"],
      referencedColumnNames: ["id"],
      referencedTableName: "config_entity",
      onDelete: "SET NULL"
    }));

    await queryRunner.createForeignKey("config_entity_field", new TableForeignKey({
      columnNames: ["configEntityId"],
      referencedColumnNames: ["id"],
      referencedTableName: "config_entity_field",
      onDelete: "CASCADE"
    }));

    await queryRunner.query(`CREATE INDEX "IDX_entityName" ON "public"."config_entity" ("entityName")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const configEntityTable = await queryRunner.getTable("config_entity");
    const fkParentEntity = configEntityTable!.foreignKeys.find(fk => fk.columnNames.includes("parentEntityId"));
    if (fkParentEntity) await queryRunner.dropForeignKey("config_entity", fkParentEntity);

    const configEntityFieldTable = await queryRunner.getTable("config_entity_field");
    const fkConfigEntity = configEntityFieldTable!.foreignKeys.find(fk => fk.columnNames.includes("configEntityId"));
    if (fkConfigEntity) await queryRunner.dropForeignKey("config_entity_field", fkConfigEntity);

    await queryRunner.dropTable('config_entity_field');
    await queryRunner.dropTable('config_entity');
  }
}
