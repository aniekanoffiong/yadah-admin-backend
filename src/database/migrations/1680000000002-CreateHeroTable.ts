import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHeroTable1680000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "hero",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "image", type: "varchar", isNullable: true },
        { name: "video", type: "varchar", isNullable: true },
        { name: "title", type: "varchar" },
        { name: "subtitle", type: "varchar", isNullable: true },
        { name: "isActive", type: "boolean", default: true },
        { name: "page", type: "varchar" },
        { name: "showControls", type: "boolean", isNullable: true },
        { name: "volunteerProgramText", type: "varchar", isNullable: true },
        { name: "volunteerProgramLink", type: "varchar", isNullable: true },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("hero");
  }
}
