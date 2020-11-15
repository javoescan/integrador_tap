import {MigrationInterface, QueryRunner} from "typeorm";

export class SaleProductsTable1605450904119 implements MigrationInterface {
    name = 'SaleProductsTable1605450904119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `sale_products` (`id` varchar(36) NOT NULL, `product_id` varchar(36) NOT NULL, `price` int NOT NULL, `quantity` int NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` timestamp(6) NULL, `saleId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `sale_products` ADD CONSTRAINT `FK_a0a0f79946845f61e52b19b6768` FOREIGN KEY (`saleId`) REFERENCES `sales`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `sale_products` DROP FOREIGN KEY `FK_a0a0f79946845f61e52b19b6768`");
        await queryRunner.query("DROP TABLE `sale_products`");
    }

}
