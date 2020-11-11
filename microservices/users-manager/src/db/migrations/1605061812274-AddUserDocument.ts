import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserDocument1605061812274 implements MigrationInterface {
    name = 'AddUserDocument1605061812274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `document` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `document`");
    }

}
