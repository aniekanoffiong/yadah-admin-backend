import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddContactSocialSocialLinksRelation16800000000021 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "contact_social_social_links",
            columns: [
                { name: "contactId", type: "int", isPrimary: true },
                { name: "socialLinkId", type: "int", isPrimary: true },
            ]
        }));

        await queryRunner.createForeignKey("contact_social_social_links", new TableForeignKey({
            columnNames: ["contactId"],
            referencedColumnNames: ["id"],
            referencedTableName: "contact_info",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("contact_social_social_links", new TableForeignKey({
            columnNames: ["socialLinkId"],
            referencedColumnNames: ["id"],
            referencedTableName: "social_link",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contact_social_social_links");
    }
}