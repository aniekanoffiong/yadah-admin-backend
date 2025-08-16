import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AddFooterSiteLinksRelation16900000000025 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      // quick links table
      await queryRunner.createTable(new Table({
        name: "footer_quick_links",
        columns: [
          { name: "footerId", type: "int", isPrimary: true },
          { name: "siteLinkId", type: "int", isPrimary: true },
        ]
      }));

      await queryRunner.createForeignKey("footer_quick_links", new TableForeignKey({
        columnNames: ["footerId"],
        referencedColumnNames: ["id"],
        referencedTableName: "footer",
        onDelete: "CASCADE"
      }));

      await queryRunner.createForeignKey("footer_quick_links", new TableForeignKey({
        columnNames: ["siteLinkId"],
        referencedColumnNames: ["id"],
        referencedTableName: "site_link",
        onDelete: "CASCADE"
      }));

      // ministries links table
      await queryRunner.createTable(new Table({
        name: "footer_ministries_links",
        columns: [
          { name: "footerId", type: "int", isPrimary: true },
          { name: "siteLinkId", type: "int", isPrimary: true },
        ]
      }));

      await queryRunner.createForeignKey("footer_ministries_links", new TableForeignKey({
        columnNames: ["footerId"],
        referencedColumnNames: ["id"],
        referencedTableName: "footer",
        onDelete: "CASCADE"
      }));

      await queryRunner.createForeignKey("footer_ministries_links", new TableForeignKey({
        columnNames: ["siteLinkId"],
        referencedColumnNames: ["id"],
        referencedTableName: "site_link",
        onDelete: "CASCADE"
      }));

      // legal links table
      await queryRunner.createTable(new Table({
        name: "footer_legal_links",
        columns: [
          { name: "footerId", type: "int", isPrimary: true },
          { name: "siteLinkId", type: "int", isPrimary: true },
        ]
      }));

      await queryRunner.createForeignKey("footer_legal_links", new TableForeignKey({
        columnNames: ["footerId"],
        referencedColumnNames: ["id"],
        referencedTableName: "footer",
        onDelete: "CASCADE"
      }));

      await queryRunner.createForeignKey("footer_legal_links", new TableForeignKey({
        columnNames: ["siteLinkId"],
        referencedColumnNames: ["id"],
        referencedTableName: "site_link",
        onDelete: "CASCADE"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("footer_quick_links");
      await queryRunner.dropTable("footer_ministries_links");
      await queryRunner.dropTable("footer_legal_links");
    }
}
