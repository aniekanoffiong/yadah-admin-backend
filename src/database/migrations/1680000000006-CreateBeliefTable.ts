import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBeliefTable1680000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "belief",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "subtitle", type: "varchar" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "belief_item",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "content", type: "varchar" },
        { name: "beliefId", type: "int" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createForeignKey("belief_item", new TableForeignKey({
      columnNames: ["beliefId"],
      referencedColumnNames: ["id"],
      referencedTableName: "belief",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const beliefItemTable = await queryRunner.getTable("belief_item");
    const fkBeliefItem = beliefItemTable!.foreignKeys.find(fk => fk.columnNames.includes("beliefId"));
    if (fkBeliefItem) await queryRunner.dropForeignKey("belief_item", fkBeliefItem);
    
    await queryRunner.dropTable("belief_item");
    await queryRunner.dropTable("belief");
  }
}
