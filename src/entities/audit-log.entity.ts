import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  action: string;

  @Column()
  resource: string;

  @Column()
  status: 'success' | 'failure';

  @Column()
  ipAddress: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ type: 'jsonb', nullable: true })
  details?: any;

  @CreateDateColumn()
  createdAt: Date;
}
