import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { EventInterface, EventName } from '../../types/event.type';

@Entity({ name: 'event' })
export class Event implements Partial<EventInterface> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  message_id: string;

  @Column({ type: 'varchar' })
  event_name: EventName;

  @Column('jsonb')
  user: EventInterface['user'];

  @Column('jsonb')
  context: EventInterface['context'];

  @Column('jsonb')
  traffic: EventInterface['traffic'];

  @Column('jsonb')
  page: EventInterface['page'];

  @Column('jsonb')
  metrics: EventInterface['metrics'];

  @Column('jsonb')
  pulse_analytics: EventInterface['pulse_analytics'];

  @Column('timestamp with time zone')
  private _timestamp: Date;

  get timestamp(): string {
    return this._timestamp.toISOString();
  }

  set timestamp(value: string) {
    this._timestamp = new Date(value);
  }

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  convertTimestamp() {
    if (typeof this._timestamp === 'string') {
      this._timestamp = new Date(this._timestamp);
    }
  }
}