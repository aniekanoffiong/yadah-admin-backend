import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSocialLinkTable1680000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
      name: "social_link",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "platform", type: "varchar", isNullable: true },
        { name: "icon", type: "varchar", isNullable: true },
        { name: "name", type: "varchar", isNullable: true },
        { name: "url", type: "varchar" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_social_link_platform" ON "public"."social_link" ("platform")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_social_link_platform"`);
    await queryRunner.dropTable("social_link");
  }
}
