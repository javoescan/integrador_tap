import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
