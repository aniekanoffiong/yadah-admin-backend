import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSermonItemTagJoinTable16900000000014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sermon_tags_item_tag",
        columns: [
          {
            name: "sermonId",
            type: "int",
            isPrimary: true,
          },
          {
            name: "itemTagId",
            type: "int",
            isPrimary: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "sermon_tags_item_tag",
      new TableForeignKey({
        columnNames: ["sermonId"],
        referencedColumnNames: ["id"],
        referencedTableName: "sermon",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "sermon_tags_item_tag",
      new TableForeignKey({
        columnNames: ["itemTagId"],
        referencedColumnNames: ["id"],
        referencedTableName: "item_tag",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("sermon_tags_item_tag");
  }
}