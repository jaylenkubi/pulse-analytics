import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Website } from "./website.entity";
import { Feature } from "./feature.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'website_feature' })
export class WebsiteFeature {
    @ApiProperty({
        description: 'Unique identifier for the website feature relationship',
        example: '660e8400-e29b-41d4-a716-446655440000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'The website this feature is enabled for',
        type: () => Website
    })
    @ManyToOne(() => Website)
    website: Website;

    @ApiProperty({
        description: 'The feature that is enabled for the website',
        type: () => Feature
    })
    @ManyToOne(() => Feature)
    feature: Feature;

    @ApiProperty({
        description: 'Whether the feature is enabled for this website',
        example: true
    })
    @Column({ type: 'boolean', default: false })
    isEnabled: boolean;

    @ApiProperty({
        description: 'Website-specific feature configuration',
        example: {
            refreshInterval: 30,
            maxDataPoints: 100,
            enableNotifications: true
        }
    })
    @Column({ type: 'jsonb', nullable: true })
    configuration: Record<string, any>; // Website-specific feature configuration

    @ApiProperty({
        description: 'Date when the feature was enabled for this website',
        example: '2025-03-01T00:00:00Z'
    })
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the website feature configuration was last updated',
        example: '2025-03-01T00:00:00Z'
    })
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}
