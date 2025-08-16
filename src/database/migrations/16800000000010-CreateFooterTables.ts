import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateFooterTables1680000000010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "footer",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "newsletterTitle", type: "varchar" },
        { name: "newsletterSubtitle", type: "varchar" },
        { name: "logoSrc", type: "varchar" },
        { name: "logoAlt", type: "varchar" },
        { name: "description", type: "text" },
        { name: "address", type: "varchar" },
        { name: "phone", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "schedule", type: "jsonb" },
        { name: "copyright", type: "varchar" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("footer");
  }
}
