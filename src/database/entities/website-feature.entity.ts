import { Column, Entity, ManyToOne } from "typeorm";
import { Website } from "./website.entity";
import { Feature } from "./feature.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'website_feature' })
export class WebsiteFeature extends BaseEntity {
    @Column({ type: 'varchar' })
    websiteId: string;

    @Column({ type: 'varchar' })
    featureId: string;

    @ManyToOne(() => Website)
    website: Website;

    @ManyToOne(() => Feature)
    feature: Feature;

    @Column({ type: 'boolean', default: false })
    isEnabled: boolean;

    @Column({ type: 'jsonb', nullable: true })
    configuration: Record<string, any>; // Website-specific feature configuration
}
