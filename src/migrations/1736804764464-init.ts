import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736804764464 implements MigrationInterface {
    name = 'Init1736804764464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eventType" character varying NOT NULL, "payload" jsonb NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "metadata" jsonb, "processingStatus" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
