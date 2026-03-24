import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1774298639638 implements MigrationInterface {
    name = 'Migration1774298639638';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "QuizAnswer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answerText" character varying NOT NULL, "isCorrect" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionId" uuid, CONSTRAINT "PK_229a1eab5820727a93fd107c867" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."QuizQuestion_type_enum" AS ENUM('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE')`,
        );
        await queryRunner.query(
            `CREATE TABLE "QuizQuestion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "topic" character varying NOT NULL, "subtopic" character varying NOT NULL, "questionDescription" character varying NOT NULL, "type" "public"."QuizQuestion_type_enum" NOT NULL DEFAULT 'SINGLE_CHOICE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6f94c5d8703d3cae2ddb3c00a09" UNIQUE ("questionDescription"), CONSTRAINT "PK_3094d1c0cbe9bcf90fc5d59fec8" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "PK_User_id"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(
            `ALTER TABLE "User" ADD CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id")`,
        );
        await queryRunner.query(
            `ALTER TABLE "QuizAnswer" ADD CONSTRAINT "FK_274134b1e745ee9aa4bc420e1a6" FOREIGN KEY ("questionId") REFERENCES "QuizQuestion"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuizAnswer" DROP CONSTRAINT "FK_274134b1e745ee9aa4bc420e1a6"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "PK_9862f679340fb2388436a5ab3e4"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "PK_User_id" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "QuizQuestion"`);
        await queryRunner.query(`DROP TYPE "public"."QuizQuestion_type_enum"`);
        await queryRunner.query(`DROP TABLE "QuizAnswer"`);
    }
}
