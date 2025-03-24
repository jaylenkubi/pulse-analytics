import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Website } from './website.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

export enum WebsiteAccessLevel {
    OWNER = 'owner',
    ADMIN = 'admin',
    ANALYST = 'analyst',
    VIEWER = 'viewer'
}

@Entity({ name: 'website_access' })
export class WebsiteAccess extends BaseEntity {
    @Column({ type: 'varchar' })
    websiteId: string;

    @Column({ type: 'varchar' })
    userId: string;

    @ManyToOne(() => Website)
    @JoinColumn({ name: 'websiteId' })
    website: Website;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ 
        type: 'enum',
        enum: WebsiteAccessLevel,
        default: WebsiteAccessLevel.VIEWER
    })
    accessLevel: WebsiteAccessLevel;
}
