import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddThumbnailAndDescriptionLive16800000000040 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("watch_live", [
            new TableColumn({ name: "description", type: "text", isNullable: true }),
            new TableColumn({ name: "thumbnailUrl", type: "varchar", length: "255", isNullable: true }),
            new TableColumn({ name: "wasLiveStream", type: "boolean", default: false }),
            new TableColumn({ name: "viewCount", type: "bigint", isNullable: true }),
            new TableColumn({ name: "duration", type: "varchar", length: "20", isNullable: true }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("watch_live", [
            "description",
            "thumbnailUrl",
            "wasLiveStream",
            "viewCount",
            "duration",
        ]);
    }
}
