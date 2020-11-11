import {MigrationInterface, QueryRunner} from "typeorm";

export class UserDeleteDate1605062407382 implements MigrationInterface {
    name = 'UserDeleteDate1605062407382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `deleted_at` timestamp(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `deleted_at`");
    }

}
