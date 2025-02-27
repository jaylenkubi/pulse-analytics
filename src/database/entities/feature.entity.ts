import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'feature' })
export class Feature {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({ type: 'varchar' })
    category: string; // e.g., 'analytics', 'reporting', 'settings'

    @Column({ type: 'boolean', default: true })
    isGloballyAvailable: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}
