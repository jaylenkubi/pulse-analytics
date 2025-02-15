import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { AnalyticsEvent, EventName } from '../../types/analytics';

@Entity({ name: 'event' })
export class Event implements Partial<AnalyticsEvent> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  message_id: string;

  @Column({ type: 'varchar' })
  event_name: EventName;

  @Column('jsonb')
  user: AnalyticsEvent['user'];

  @Column('jsonb')
  context: AnalyticsEvent['context'];

  @Column('jsonb')
  traffic: AnalyticsEvent['traffic'];

  @Column('jsonb')
  page: AnalyticsEvent['page'];

  @Column('jsonb')
  metrics: AnalyticsEvent['metrics'];

  @Column('jsonb')
  pulse_analytics: AnalyticsEvent['pulse_analytics'];

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