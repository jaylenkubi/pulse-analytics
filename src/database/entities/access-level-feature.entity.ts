import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Feature } from "./feature.entity";
import { WebsiteAccessLevel } from "./website-access.entity";

@Entity({ name: 'access_level_feature' })
export class AccessLevelFeature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'enum',
        enum: WebsiteAccessLevel
    })
    accessLevel: WebsiteAccessLevel;

    @ManyToOne(() => Feature)
    feature: Feature;

    @Column({ type: 'jsonb', nullable: true })
    permissions: {
        canView: boolean;
        canEdit: boolean;
        canManage: boolean;
    };

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
}
