import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'website' })
export class Website extends BaseEntity {
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
}
