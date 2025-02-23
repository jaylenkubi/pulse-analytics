import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'website' })
export class Website {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'jsonb' })
    domains: string[];

    @Column({ type: 'uuid' })
    tracking_id: string;

    @Column({ type: 'jsonb', nullable: true })
    settings: {
        tracking_options: string[];
        excluded_paths: string[];
        custom_variables: Record<string, string>;
    };

    @ManyToOne(() => User)
    owner: User;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updated_at: Date;
}
