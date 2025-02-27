import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Website } from "./website.entity";
import { Feature } from "./feature.entity";

@Entity({ name: 'website_feature' })
export class WebsiteFeature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Website)
    website: Website;

    @ManyToOne(() => Feature)
    feature: Feature;

    @Column({ type: 'boolean', default: false })
    isEnabled: boolean;

    @Column({ type: 'jsonb', nullable: true })
    configuration: Record<string, any>; // Website-specific feature configuration

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}
