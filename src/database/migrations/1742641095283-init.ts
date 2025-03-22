import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742641095283 implements MigrationInterface {
    name = 'Init1742641095283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "isGloballyAvailable" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_4832be692a2dc63d67e8e93c758" UNIQUE ("name"), CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "website_feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isEnabled" boolean NOT NULL DEFAULT false, "configuration" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "websiteId" uuid, "featureId" uuid, CONSTRAINT "PK_8b4b861083c387e6ebd67cb0d5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."access_level_feature_accesslevel_enum" AS ENUM('owner', 'admin', 'analyst', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "access_level_feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accessLevel" "public"."access_level_feature_accesslevel_enum" NOT NULL, "permissions" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "featureId" uuid, CONSTRAINT "PK_2a98d757cd3f8608cc59ca44884" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" ADD CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_level_feature" DROP CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b"`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267"`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25"`);
        await queryRunner.query(`DROP TABLE "access_level_feature"`);
        await queryRunner.query(`DROP TYPE "public"."access_level_feature_accesslevel_enum"`);
        await queryRunner.query(`DROP TABLE "website_feature"`);
        await queryRunner.query(`DROP TABLE "feature"`);
    }

}
