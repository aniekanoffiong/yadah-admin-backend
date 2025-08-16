import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGrowingInFaithTable1680000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "growing_in_faith",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "description", type: "text" },
        { name: "secondDescription", type: "text", isNullable: true },
        { name: "image", type: "varchar" },
        { name: "buttonText", type: "varchar" },
        { name: "buttonLink", type: "varchar" }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("growing_in_faith");
  }
}
