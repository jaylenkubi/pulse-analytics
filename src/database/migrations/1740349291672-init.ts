import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1740349291672 implements MigrationInterface {
    name = 'Init1740349291672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "website" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "domains" jsonb NOT NULL, "tracking_id" uuid NOT NULL, "settings" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_979e53e64186ccd315cf09b3b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."website_access_access_level_enum" AS ENUM('owner', 'admin', 'analyst', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "website_access" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "access_level" "public"."website_access_access_level_enum" NOT NULL DEFAULT 'viewer', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "websiteId" uuid, "userId" uuid, CONSTRAINT "PK_866ff03f5558ed66db37af26a15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "event" ADD "website_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD "tracking_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event" ADD "websiteId" uuid`);
        await queryRunner.query(`ALTER TABLE "website" ADD CONSTRAINT "FK_a6b13c7f6d73e798e41cee961ba" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_635e02161ae9979b02f18e229bc" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_d97472c28ab9cbe37e653ba8ae8" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_d97472c28ab9cbe37e653ba8ae8"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_635e02161ae9979b02f18e229bc"`);
        await queryRunner.query(`ALTER TABLE "website" DROP CONSTRAINT "FK_a6b13c7f6d73e798e41cee961ba"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "websiteId"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "tracking_id"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "website_id"`);
        await queryRunner.query(`DROP TABLE "website_access"`);
        await queryRunner.query(`DROP TYPE "public"."website_access_access_level_enum"`);
        await queryRunner.query(`DROP TABLE "website"`);
    }

}
