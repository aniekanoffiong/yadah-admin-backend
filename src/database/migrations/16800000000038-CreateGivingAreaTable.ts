import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateGivingAreaTable16800000000038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'give_data',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'optionsHeading', type: 'text', isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'supported_currency',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'name', type: 'text', isNullable: false },
          { name: 'symbol', type: 'text', isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'giveId', type: 'int' },
        ],
      }),
    );
    
    await queryRunner.createTable(
      new Table({
        name: 'giving_area',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'title', type: 'varchar', isNullable: false },
          { name: 'description', type: 'varchar', isNullable: false },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          { name: 'giveId', type: 'int' },
        ],
      }),
    );

    await queryRunner.createForeignKey("supported_currency", new TableForeignKey({
      columnNames: ["giveId"],
      referencedColumnNames: ["id"],
      referencedTableName: "give_data",
      onDelete: "CASCADE"
    }));

    await queryRunner.createForeignKey("giving_area", new TableForeignKey({
      columnNames: ["giveId"],
      referencedColumnNames: ["id"],
      referencedTableName: "give_data",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const currencyTable = await queryRunner.getTable("supported_currency");
    const fkCurerncyGiveId = currencyTable!.foreignKeys.find(fk => fk.columnNames.includes("giveId"));
    if (fkCurerncyGiveId) await queryRunner.dropForeignKey("supported_currency", fkCurerncyGiveId);

    const giveAreaTable = await queryRunner.getTable("giving_area");
    const fkgiveAreaGiveId = giveAreaTable!.foreignKeys.find(fk => fk.columnNames.includes("giveId"));
    if (fkgiveAreaGiveId) await queryRunner.dropForeignKey("giving_area", fkgiveAreaGiveId);

    await queryRunner.dropTable('giving_area');
  }
}
