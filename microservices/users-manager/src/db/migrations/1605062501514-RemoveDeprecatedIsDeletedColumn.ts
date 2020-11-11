import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveDeprecatedIsDeletedColumn1605062501514 implements MigrationInterface {
    name = 'RemoveDeprecatedIsDeletedColumn1605062501514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `is_deleted`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `is_deleted` tinyint NOT NULL DEFAULT '0'");
    }

}
