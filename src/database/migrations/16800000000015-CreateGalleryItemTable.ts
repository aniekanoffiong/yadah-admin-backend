import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGalleryItemTable1680000000015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "gallery_item",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "src", type: "varchar" },
        { name: "alt", type: "varchar" },
        { name: "caption", type: "varchar" },
        { name: "date", type: "date", default: "now()" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gallery_item");
  }
}
