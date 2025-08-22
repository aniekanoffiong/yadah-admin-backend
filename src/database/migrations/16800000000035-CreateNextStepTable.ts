import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNextStepTable16800000000035 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'next_step',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'title', type: 'varchar', isNullable: false },
                    { name: 'subtitle', type: 'varchar', isNullable: true },
                    { name: 'variant', type: 'varchar', isNullable: false },
                    { name: 'page', type: 'varchar', isNullable: true },
                    { name: 'createdAt', type: 'timestamp', default: 'now()' },
                    { name: 'updatedAt', type: 'timestamp', default: 'now()' },
                ],
            }),
        );

        await queryRunner.createTable(new Table({
            name: "next_step_item",
            columns: [
                { name: "id", type: "serial", isPrimary: true },
                { name: "icon", type: "varchar" },
                { name: "title", type: "varchar" },
                { name: "description", type: "varchar" },
                { name: "buttonText", type: "varchar" },
                { name: "buttonLink", type: "varchar" },
                { name: "nextStepId", type: "int" },
                { name: 'createdAt', type: 'timestamp', default: 'now()' },
                { name: 'updatedAt', type: 'timestamp', default: 'now()' },
            ]
        }));

        await queryRunner.createForeignKey("next_step_item", new TableForeignKey({
            columnNames: ["nextStepId"],
            referencedColumnNames: ["id"],
            referencedTableName: "next_step",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const itemTable = await queryRunner.getTable("next_step_item");
        const fkActivity = itemTable!.foreignKeys.find(fk => fk.columnNames.includes("nextStepId"));
        if (fkActivity) await queryRunner.dropForeignKey("next_step_item", fkActivity);

        await queryRunner.dropTable("next_step_item");
        await queryRunner.dropTable("next_step");
    }
}