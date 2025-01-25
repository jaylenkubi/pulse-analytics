import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'event' })
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  eventType: string;

  @Column('jsonb')
  payload: Record<string, any>;

  @Column('timestamp with time zone')
  timestamp: Date;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @Column({ 
    type: 'varchar',
    default: 'pending'
  })
  processingStatus: 'pending' | 'processed' | 'failed';

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;
}