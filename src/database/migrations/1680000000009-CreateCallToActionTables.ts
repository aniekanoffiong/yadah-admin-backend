import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCallToActionTables1680000000009 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "call_to_action",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "subtitle", type: "varchar" },
        { name: "page", type: "varchar" },
        { name: "pageSection", type: "varchar", isNullable: true },
        { name: "backgroundImage", type: "varchar", isNullable: true },
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
        { name: "url", type: "varchar", isNullable: false },
        { name: "callToActionId", type: "int" }
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "cta_added_info",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "value", type: "varchar" },
        { name: "description", type: "varchar" },
        { name: "callToActionId", type: "int" }
      ]
    }));
    await queryRunner.createForeignKey("cta_added_info", new TableForeignKey({
      columnNames: ["callToActionId"],
      referencedColumnNames: ["id"],
      referencedTableName: "call_to_action",
      onDelete: "CASCADE"
    }));
  
    await queryRunner.createForeignKey("cta_button", new TableForeignKey({
      columnNames: ["callToActionId"],
      referencedColumnNames: ["id"],
      referencedTableName: "call_to_action",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableCTAButton = await queryRunner.getTable("cta_button");
    const fkButton = tableCTAButton!.foreignKeys.find(fk => fk.columnNames.includes("callToActionId"));
    if (fkButton) await queryRunner.dropForeignKey("cta_button", fkButton);

    const tableCTAAddedInfo = await queryRunner.getTable("cta_added_info");
    const fkAddedInfo = tableCTAAddedInfo!.foreignKeys.find(fk => fk.columnNames.includes("callToActionId"));
    if (fkAddedInfo) await queryRunner.dropForeignKey("cta_added_info", fkAddedInfo);

    await queryRunner.dropTable("cta_button");
    await queryRunner.dropTable("cta_added_info");
    await queryRunner.dropTable("call_to_action");
  }
}
