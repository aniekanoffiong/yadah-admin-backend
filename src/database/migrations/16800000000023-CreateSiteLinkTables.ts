import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSiteLinkTables1680000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "site_link",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "label", type: "varchar" },
        { name: "url", type: "varchar" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("site_link");
  }
}
