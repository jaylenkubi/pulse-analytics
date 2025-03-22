import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'feature' })
export class Feature {
    @ApiProperty({
        description: 'Unique identifier for the feature',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @ApiProperty({
        description: 'Date when the feature was created',
        example: '2025-03-01T00:00:00Z'
    })
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @ApiProperty({
        description: 'Date when the feature was last updated',
        example: '2025-03-01T00:00:00Z'
    })
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}
