import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAdditionalTimesToScheduledProgram1680000000004216800000000042 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("scheduled_program", [
            new TableColumn({ name: "additional_times", type: "text", isNullable: true }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("scheduled_program", [
            "additional_times",
        ]);
    }
}
