import { Column, Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'feature' })
export class Feature extends BaseEntity {
    @ApiProperty({
        description: 'Unique name identifier for the feature',
        example: 'realtime-analytics'
    })
    @Column({ type: 'varchar', unique: true })
    name: string;

    @ApiProperty({
        description: 'Description of what the feature does',
        example: 'Provides real-time analytics and visitor tracking'
    })
    @Column({ type: 'varchar' })
    description: string;

    @ApiProperty({
        description: 'Category the feature belongs to',
        example: 'analytics',
        enum: ['analytics', 'reporting', 'settings', 'user-management']
    })
    @Column({ type: 'varchar' })
    category: string; // e.g., 'analytics', 'reporting', 'settings'

    @ApiProperty({
        description: 'Whether the feature is available to all websites by default',
        example: true
    })
    @Column({ type: 'boolean', default: true })
    isGloballyAvailable: boolean;
}
