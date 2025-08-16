import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStatisticsTable1680000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "statistics",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "backgroundImage", type: "varchar", isNullable: true },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "stat_item",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "number", type: "varchar" },
        { name: "label", type: "varchar" },
        { name: "icon", type: "varchar", isNullable: true },
        { name: "statisticsId", type: "int" }
      ]
    }));

    await queryRunner.createForeignKey("stat_item", new TableForeignKey({
      columnNames: ["statisticsId"],
      referencedColumnNames: ["id"],
      referencedTableName: "statistics",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("stat_item");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("statisticsId") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("stat_item", foreignKey);
    }
    await queryRunner.dropTable("stat_item");
    await queryRunner.dropTable("statistics");
  }
}
