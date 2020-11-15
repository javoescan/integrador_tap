import { SaleProduct } from 'business/sale-products/sale-products.entity';
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'sales' })
export class Sale {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', { length: 36, name: 'user_id' })
	userId: string;

	@Column()
	total: number;

	@Column({ type: 'timestamp' })
	date: Date;

	// Jest does not support testing decorators
	@OneToMany( /* istanbul ignore next */ () => SaleProduct, /* istanbul ignore next */ saleProduct => saleProduct.sale, { cascade: true })
  products: SaleProduct[];

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
