import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRoles } from './enums/roles.enums';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'first_name' })
	firstName: string;

	@Column({ name: 'last_name' })
	lastName: string;

	@Column('varchar', { length: 100 })
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: UserRoles,
		default: UserRoles.SELLER,
	})
	role: UserRoles;

	@Column({ type: 'tinyint', name: 'is_deleted', default: false })
	isDeleted: boolean;

	@CreateDateColumn({ type: 'timestamp', name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
	updatedAt: Date;

	@BeforeInsert()
	async beforeInsert(): Promise<void> {
		this.id = uuid();
		this.password = await bcrypt.hash(this.password, 10);
		this.isDeleted = false;
	}
}
