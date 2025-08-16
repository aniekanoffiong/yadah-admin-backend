import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddFooterSocialSocialLinksRelation16800000000020 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "footer_social_social_links",
            columns: [
                { name: "footerId", type: "int", isPrimary: true },
                { name: "socialLinkId", type: "int", isPrimary: true },
            ]
        }));

        await queryRunner.createForeignKey("footer_social_social_links", new TableForeignKey({
            columnNames: ["footerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "footer",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("footer_social_social_links", new TableForeignKey({
            columnNames: ["socialLinkId"],
            referencedColumnNames: ["id"],
            referencedTableName: "social_link",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("footer_social_social_links");
    }
}