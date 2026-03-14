import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1773523072100 implements MigrationInterface {
    name = 'Migration1773523072100';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "email"`);
    }
}
