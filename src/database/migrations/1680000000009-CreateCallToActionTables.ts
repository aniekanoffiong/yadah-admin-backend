import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCallToActionTables1680000000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "call_to_action",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "subtitle", type: "varchar" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "cta_button",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "text", type: "varchar" },
        { name: "variant", type: "varchar" },
        { name: "icon", type: "varchar", isNullable: true },
        { name: "callToActionId", type: "int" }
      ]
    }));

    await queryRunner.createForeignKey("cta_button", new TableForeignKey({
      columnNames: ["callToActionId"],
      referencedColumnNames: ["id"],
      referencedTableName: "call_to_action",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("cta_button");
    const fk = table!.foreignKeys.find(fk => fk.columnNames.includes("callToActionId"));
    if (fk) await queryRunner.dropForeignKey("cta_button", fk);

    await queryRunner.dropTable("cta_button");
    await queryRunner.dropTable("call_to_action");
  }
}
