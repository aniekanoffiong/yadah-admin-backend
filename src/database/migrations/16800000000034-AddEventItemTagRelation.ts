import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddEventTagsRelation16800000000034 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "event_tags_item_tag",
            columns: [
                { name: "eventId", type: "int", isPrimary: true },
                { name: "itemTagId", type: "int", isPrimary: true },
            ]
        }));

        await queryRunner.createForeignKey("event_tags_item_tag", new TableForeignKey({
            columnNames: ["eventId"],
            referencedColumnNames: ["id"],
            referencedTableName: "event",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("event_tags_item_tag", new TableForeignKey({
            columnNames: ["itemTagId"],
            referencedColumnNames: ["id"],
            referencedTableName: "item_tag",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("event_tags_item_tag");
    }
}