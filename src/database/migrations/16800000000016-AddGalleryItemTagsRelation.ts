import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddGalleryItemTagsRelation16800000000016 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "gallery_item_tags_item_tag",
            columns: [
                { name: "galleryItemId", type: "int", isPrimary: true },
                { name: "itemTagId", type: "int", isPrimary: true },
            ]
        }));

        await queryRunner.createForeignKey("gallery_item_tags_item_tag", new TableForeignKey({
            columnNames: ["galleryItemId"],
            referencedColumnNames: ["id"],
            referencedTableName: "gallery_item",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("gallery_item_tags_item_tag", new TableForeignKey({
            columnNames: ["itemTagId"],
            referencedColumnNames: ["id"],
            referencedTableName: "item_tag",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("gallery_item_tags_item_tag");
    }
}