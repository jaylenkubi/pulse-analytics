import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../entities/audit-log.entity';

@Injectable()
export class AuditLogService {
  private readonly logger = new Logger(AuditLogService.name);

  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(data: {
    userId: string;
    action: string;
    resource: string;
    status: 'success' | 'failure';
    ipAddress: string;
    userAgent?: string;
    details?: any;
  }) {
    try {
      const auditLog = this.auditLogRepository.create(data);
      await this.auditLogRepository.save(auditLog);
      
      if (data.status === 'failure') {
        this.logger.warn(`Failed ${data.action} attempt on ${data.resource} by user ${data.userId} from ${data.ipAddress}`);
      }
    } catch (error) {
      this.logger.error('Failed to save audit log', error);
    }
  }

  async getRecentFailedAttempts(userId: string, minutes: number = 15): Promise<number> {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - minutes);

    return this.auditLogRepository.count({
      where: {
        userId,
        status: 'failure',
        // @ts-ignore
        createdAt: { $gte: timestamp }
      }
    });
  }
}
