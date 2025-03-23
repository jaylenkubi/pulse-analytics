import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742767764443 implements MigrationInterface {
    name = 'Init1742767764443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_d97472c28ab9cbe37e653ba8ae8"`);
        await queryRunner.query(`ALTER TABLE "website" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "website" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "websiteId"`);
        await queryRunner.query(`ALTER TABLE "website" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "website" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25"`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267"`);
        await queryRunner.query(`ALTER TABLE "website_feature" ALTER COLUMN "websiteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_feature" ALTER COLUMN "featureId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_635e02161ae9979b02f18e229bc"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0"`);
        await queryRunner.query(`ALTER TABLE "website_access" ALTER COLUMN "websiteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_access" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" DROP CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b"`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" ALTER COLUMN "featureId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_635e02161ae9979b02f18e229bc" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" ADD CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_f0118159990c392ef5899927e3c" FOREIGN KEY ("website_id") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_f0118159990c392ef5899927e3c"`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" DROP CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP CONSTRAINT "FK_635e02161ae9979b02f18e229bc"`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267"`);
        await queryRunner.query(`ALTER TABLE "website_feature" DROP CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25"`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" ALTER COLUMN "featureId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" ADD CONSTRAINT "FK_595c95ca4cabcaa420d6dbda27b" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_access" ALTER COLUMN "websiteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_77deda6a8f3d3a7126c2c1b17f0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD CONSTRAINT "FK_635e02161ae9979b02f18e229bc" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_feature" ALTER COLUMN "featureId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_feature" ALTER COLUMN "websiteId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_f2ac1459ae5a1e753f05a2d9267" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "website_feature" ADD CONSTRAINT "FK_24a30d5abb4f1d7c3ee2df10c25" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "access_level_feature" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "website_access" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "website" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "website" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "event" ADD "websiteId" uuid`);
        await queryRunner.query(`ALTER TABLE "event" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "website_access" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "website" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "website" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_d97472c28ab9cbe37e653ba8ae8" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
