import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Feature } from "./feature.entity";
import { WebsiteAccessLevel } from "./website-access.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'access_level_feature' })
export class AccessLevelFeature {
    @ApiProperty({
        description: 'Unique identifier for the access level feature relationship',
        example: '880e8400-e29b-41d4-a716-446655440000'
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Access level for this feature permission set',
        example: 'ADMIN',
        enum: WebsiteAccessLevel
    })
    @Column({ 
        type: 'enum',
        enum: WebsiteAccessLevel
    })
    accessLevel: WebsiteAccessLevel;

    @ApiProperty({
        description: 'The feature these permissions apply to',
        type: () => Feature
    })
    @ManyToOne(() => Feature)
    feature: Feature;

    @ApiProperty({
        description: 'Permission settings for this feature and access level',
        example: {
            canView: true,
            canEdit: true,
            canManage: false
        }
    })
    @Column({ type: 'jsonb', nullable: true })
    permissions: {
        canView: boolean;
        canEdit: boolean;
        canManage: boolean;
    };

    @ApiProperty({
        description: 'Date when this permission set was created',
        example: '2025-03-01T00:00:00Z'
    })
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
}
