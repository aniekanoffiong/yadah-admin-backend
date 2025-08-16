import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateItemTagTable1680000000013 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "item_tag",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "label", type: "varchar" },
        { name: "isActive", type: "boolean", default: false},
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_item_tag_label" ON "public"."item_tag" ("label")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_item_tag_label"`);
    await queryRunner.dropTable("item_tag");
  }
}
