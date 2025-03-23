import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'session' })
export class Session extends BaseEntity {
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    userId: string;

    @Column({ nullable: true })
    token: string;

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ nullable: true })
    userAgent: string;

    @Column({ default: true })
    isValid: boolean;

    @Column({ type: 'timestamp' })
    expiresAt: Date;
}
