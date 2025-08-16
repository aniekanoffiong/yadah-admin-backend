import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePastorTables1680000000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "pastor",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "image", type: "varchar" },
        { name: "role", type: "varchar" },
        { name: "name", type: "varchar" },
        { name: "description", type: "text" },
        { name: "quote", type: "text" },
        { name: "ministryId", type: "int", isNullable: true },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "achievement",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "icon", type: "varchar" },
        { name: "text", type: "varchar" },
        { name: "pastorId", type: "int" }
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "ministry_focus",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "title", type: "varchar" },
        { name: "content", type: "text" }
      ]
    }));

    // Foreign keys
    await queryRunner.createForeignKey("pastor", new TableForeignKey({
      columnNames: ["ministryId"],
      referencedColumnNames: ["id"],
      referencedTableName: "ministry_focus",
      onDelete: "SET NULL"
    }));

    await queryRunner.createForeignKey("achievement", new TableForeignKey({
      columnNames: ["pastorId"],
      referencedColumnNames: ["id"],
      referencedTableName: "pastor",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const pastorTable = await queryRunner.getTable("pastor");
    const fkMinistry = pastorTable!.foreignKeys.find(fk => fk.columnNames.includes("ministryId"));
    if (fkMinistry) await queryRunner.dropForeignKey("pastor", fkMinistry);

    const achievementTable = await queryRunner.getTable("achievement");
    const fkAchievement = achievementTable!.foreignKeys.find(fk => fk.columnNames.includes("pastorId"));
    if (fkAchievement) await queryRunner.dropForeignKey("achievement", fkAchievement);

    await queryRunner.dropTable("achievement");
    await queryRunner.dropTable("pastor");
    await queryRunner.dropTable("ministry_focus");
  }
}
