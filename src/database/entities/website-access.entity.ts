import { Column, Entity, ManyToOne } from 'typeorm';
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
}
