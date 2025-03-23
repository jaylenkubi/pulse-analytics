import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'Unique identifier',
    example: '660e8400-e29b-41d4-a716-446655440000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-03-01T00:00:00Z'
  })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-03-01T00:00:00Z'
  })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
