import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMinistryTables1680000000011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "ministry",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "icon", type: "varchar", isNullable: true },
        { name: "title", type: "varchar" },
        { name: "description", type: "text" },
        { name: "scheduledDay", type: "varchar", isNullable: true },
        { name: "meetingTime", type: "time", isNullable: true },
        { name: "location", type: "text", isNullable: true },
        { name: "leader", type: "text", isNullable: true },
        { name: "members", type: "varchar", isNullable: true },
        { name: "createdAt", type: "timestamp", default: "now()" },
        { name: "updatedAt", type: "timestamp", default: "now()" },
      ]
    }));

    await queryRunner.createTable(new Table({
      name: "ministry_activity",
      columns: [
        { name: "id", type: "serial", isPrimary: true },
        { name: "activityName", type: "varchar" },
        { name: "ministryId", type: "int" }
      ]
    }));

    await queryRunner.createForeignKey("ministry_activity", new TableForeignKey({
      columnNames: ["ministryId"],
      referencedColumnNames: ["id"],
      referencedTableName: "ministry",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const activityTable = await queryRunner.getTable("ministry_activity");
    const fkActivity = activityTable!.foreignKeys.find(fk => fk.columnNames.includes("ministryId"));
    if (fkActivity) await queryRunner.dropForeignKey("ministry_activity", fkActivity);

    await queryRunner.dropTable("ministry_activity");
    await queryRunner.dropTable("ministry");
  }
}
