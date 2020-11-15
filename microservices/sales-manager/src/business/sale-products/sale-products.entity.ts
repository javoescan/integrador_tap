import { Sale } from 'business/sales/sales.entity';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'sale_products' })
export class SaleProduct {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 36, name: 'product_id' })
	productId: string;

	@Column()
	price: number;

	@Column()
	quantity: number;

	// Jest does not support testing decorators
	@ManyToOne( /* istanbul ignore next */ () => Sale,  /* istanbul ignore next */ sale => sale.products)
  sale: Sale;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;

	@DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

	@BeforeInsert()
	async beforeInsert(): Promise<void> {
		this.id = uuid();
	}
}
