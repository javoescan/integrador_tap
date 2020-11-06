import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersTable1604633029984 implements MigrationInterface {
    name = 'UsersTable1604633029984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `first_name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(255) NOT NULL, `role` enum ('0', '1') NOT NULL DEFAULT '1', `is_deleted` tinyint NOT NULL DEFAULT 0, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users`");
    }

}
