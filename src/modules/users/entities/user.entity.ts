import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    firstName?: string;

    @Column({ nullable: true })
    lastName?: string;

    @Exclude({ toPlainOnly: true })
    @CreateDateColumn()
    createdAt?: Date;

    @Exclude({ toPlainOnly: true })
    @UpdateDateColumn()
    updatedAt?: Date;
}
