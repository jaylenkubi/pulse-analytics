import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { EventInterface, EventName } from '../../types/event.type';
import { Website } from './website.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'event' })
export class Event extends BaseEntity implements Partial<EventInterface> {
  @Column({ type: 'varchar' })
  message_id: string;

  @Column({ type: 'varchar' })
  eventName: EventName;

  @ManyToOne(() => Website)
  @JoinColumn({ name: 'websiteId' })
  website: Website;

  @Column({ type: 'uuid' })
  websiteId: string;

  @Column({ type: 'varchar' })
  trackingId: string;

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
  pulseAnalytics: EventInterface['pulseAnalytics'];

  @Column('timestamp with time zone')
  private _timestamp: Date;

  get timestamp(): string {
    return this._timestamp.toISOString();
  }

  set timestamp(value: string) {
    this._timestamp = new Date(value);
  }

  @BeforeInsert()
  @BeforeUpdate()
  convertTimestamp() {
    if (typeof this._timestamp === 'string') {
      this._timestamp = new Date(this._timestamp);
    }
  }
}