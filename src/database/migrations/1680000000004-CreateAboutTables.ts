import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAboutTables1680000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "about",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "mainTitle", type: "varchar" },
        { name: "highlightedTitle", type: "varchar" },
        { name: "description", type: "text" },
        { name: "storyId", type: "int", isNullable: true },
        { name: "valuesId", type: "int", isNullable: true },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "story",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "content", type: "text" },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "story_stat",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "text", type: "varchar" },
        { name: "storyId", type: "int" }
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "values",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "subtitle", type: "varchar" }
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "value_item",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "icon", type: "varchar" },
        { name: "title", type: "varchar" },
        { name: "description", type: "text" },
        { name: "valuesId", type: "int" }
      ]
    }));

    // Foreign Keys
    await queryRunner.createForeignKey("about", new TableForeignKey({
      columnNames: ["storyId"],
      referencedColumnNames: ["id"],
      referencedTableName: "story",
      onDelete: "SET NULL"
    }));

    await queryRunner.createForeignKey("about", new TableForeignKey({
      columnNames: ["valuesId"],
      referencedColumnNames: ["id"],
      referencedTableName: "values",
      onDelete: "SET NULL"
    }));

    await queryRunner.createForeignKey("story_stat", new TableForeignKey({
      columnNames: ["storyId"],
      referencedColumnNames: ["id"],
      referencedTableName: "story",
      onDelete: "CASCADE"
    }));

    await queryRunner.createForeignKey("value_item", new TableForeignKey({
      columnNames: ["valuesId"],
      referencedColumnNames: ["id"],
      referencedTableName: "values",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const aboutTable = await queryRunner.getTable("about");
    const fkStory = aboutTable!.foreignKeys.find(fk => fk.columnNames.includes("storyId"));
    if (fkStory) await queryRunner.dropForeignKey("about", fkStory);

    const fkValues = aboutTable!.foreignKeys.find(fk => fk.columnNames.includes("valuesId"));
    if (fkValues) await queryRunner.dropForeignKey("about", fkValues);

    const storyStatTable = await queryRunner.getTable("story_stat");
    const fkStoryStat = storyStatTable!.foreignKeys.find(fk => fk.columnNames.includes("storyId"));
    if (fkStoryStat) await queryRunner.dropForeignKey("story_stat", fkStoryStat);

    const valueItemTable = await queryRunner.getTable("value_item");
    const fkValueItem = valueItemTable!.foreignKeys.find(fk => fk.columnNames.includes("valuesId"));
    if (fkValueItem) await queryRunner.dropForeignKey("value_item", fkValueItem);

    await queryRunner.dropTable("value_item");
    await queryRunner.dropTable("values");
    await queryRunner.dropTable("story_stat");
    await queryRunner.dropTable("story");
    await queryRunner.dropTable("about");
  }
}
