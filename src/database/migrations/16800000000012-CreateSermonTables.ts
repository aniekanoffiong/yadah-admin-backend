import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSermonTables1680000000012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "sermon",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "minister", type: "varchar" },
        { name: "date", type: "date" },
        { name: "duration", type: "varchar" },
        { name: "image", type: "varchar" },
        { name: "featured", type: "boolean", default: false },
        { name: "videoUrl", type: "varchar" }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sermon");
  }
}
