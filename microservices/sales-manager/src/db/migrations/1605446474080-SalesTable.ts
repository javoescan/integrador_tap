import {MigrationInterface, QueryRunner} from "typeorm";

export class SalesTable1605446474080 implements MigrationInterface {
    name = 'SalesTable1605446474080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `sales` (`id` varchar(36) NOT NULL, `user_id` varchar(36) NOT NULL, `total` int NOT NULL, `date` timestamp NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` timestamp(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `sales`");
    }

}
