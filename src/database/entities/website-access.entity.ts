import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Website } from './website.entity';
import { User } from './user.entity';

export enum WebsiteAccessLevel {
    OWNER = 'owner',
    ADMIN = 'admin',
    ANALYST = 'analyst',
    VIEWER = 'viewer'
}

@Entity({ name: 'website_access' })
export class WebsiteAccess {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Website)
    website: Website;

    @ManyToOne(() => User)
    user: User;

    @Column({ 
        type: 'enum',
        enum: WebsiteAccessLevel,
        default: WebsiteAccessLevel.VIEWER
    })
    access_level: WebsiteAccessLevel;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    created_at: Date;
}
