import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Feature } from "./feature.entity";
import { WebsiteAccessLevel } from "./website-access.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'access_level_feature' })
export class AccessLevelFeature extends BaseEntity {
    @Column({ 
        type: 'enum',
        enum: WebsiteAccessLevel
    })
    accessLevel: WebsiteAccessLevel;

    @Column()
    featureId: string;

    @ManyToOne(() => Feature)
    @JoinColumn({ name: 'featureId' })
    feature: Feature;

    @Column({ type: 'jsonb', nullable: true })
    permissions: {
        canView: boolean;
        canEdit: boolean;
        canManage: boolean;
    };
}
