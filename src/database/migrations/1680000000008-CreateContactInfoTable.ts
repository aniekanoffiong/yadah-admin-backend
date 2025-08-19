import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContactInfoTable1680000000008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "contact_info",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "subtitle", type: "varchar" },
        { name: "address", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "phones", type: "text", isArray: true },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("contact_info");
  }
}
