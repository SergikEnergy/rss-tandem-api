import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialUser1773523072000 implements MigrationInterface {
    name = 'InitialUser1773523072000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "User" (
                "id" SERIAL NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "firstName" character varying,
                "lastName" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_User_login" UNIQUE ("login"),
                CONSTRAINT "PK_User_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
    }
}
