import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742775785462 implements MigrationInterface {
    name = 'Init1742775785462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "website" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "domains" jsonb NOT NULL, "trackingId" uuid NOT NULL, "settings" jsonb, "ownerId" uuid, CONSTRAINT "PK_979e53e64186ccd315cf09b3b14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."website_access_accesslevel_enum" AS ENUM('owner', 'admin', 'analyst', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "website_access" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "websiteId" uuid NOT NULL, "userId" uuid NOT NULL, "accessLevel" "public"."website_access_accesslevel_enum" NOT NULL DEFAULT 'viewer', CONSTRAINT "PK_866ff03f5558ed66db37af26a15" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "category" character varying NOT NULL, "isGloballyAvailable" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_4832be692a2dc63d67e8e93c758" UNIQUE ("name"), CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "website_feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "websiteId" uuid NOT NULL, "featureId" uuid NOT NULL, "isEnabled" boolean NOT NULL DEFAULT false, "configuration" jsonb, CONSTRAINT "PK_8b4b861083c387e6ebd67cb0d5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "token" character varying, "ipAddress" character varying, "userAgent" character varying, "isValid" boolean NOT NULL DEFAULT true, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "message_id" character varying NOT NULL, "eventName" character varying NOT NULL, "websiteId" uuid NOT NULL, "trackingId" character varying NOT NULL, "user" jsonb NOT NULL, "context" jsonb NOT NULL, "traffic" jsonb NOT NULL, "page" jsonb NOT NULL, "metrics" jsonb NOT NULL, "pulseAnalytics" jsonb NOT NULL, "_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audit_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "action" character varying NOT NULL, "resource" character varying NOT NULL, "status" character varying NOT NULL, "ipAddress" character varying NOT NULL, "userAgent" character varying, "details" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."access_level_feature_accesslevel_enum" AS ENUM('owner', 'admin', 'analyst', 'viewer')`);
        await queryRunner.query(`CREATE TABLE "access_level_feature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "accessLevel" "public"."access_level_feature_accesslevel_enum" NOT NULL, "featureId" uuid NOT NULL, "permissions" jsonb, CONSTRAINT "PK_2a98d757cd3f8608cc59ca44884" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "website" ADD CONSTRAINT "FK_a6b13c7f6d73e798e41cee961ba" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_635e02161ae9979b02f18e229bc" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_d97472c28ab9cbe37e653ba8ae8" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" ADD CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "access_level_feature" DROP CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_d97472c28ab9cbe37e653ba8ae8"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267"`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_635e02161ae9979b02f18e229bc"`);
        await queryRunner.query(`ALTER TABLE "website" DROP CONSTRAINT "FK_a6b13c7f6d73e798e41cee961ba"`);
        await queryRunner.query(`DROP TABLE "access_level_feature"`);
        await queryRunner.query(`DROP TYPE "public"."access_level_feature_accesslevel_enum"`);
        await queryRunner.query(`DROP TABLE "audit_log"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "website_feature"`);
        await queryRunner.query(`DROP TABLE "feature"`);
        await queryRunner.query(`DROP TABLE "website_access"`);
        await queryRunner.query(`DROP TYPE "public"."website_access_accesslevel_enum"`);
        await queryRunner.query(`DROP TABLE "website"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
