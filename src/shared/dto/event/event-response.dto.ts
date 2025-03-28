import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../common/base-response.dto';
import { EventInterface, EventName } from '@/types/event.type';

export class EventResponseDto extends BaseResponseDto {
    @ApiProperty({ description: 'Unique message ID' })
    messageId: string;

    @ApiProperty({ 
        description: 'Event name',
        enum: EventName
    })
    eventName: EventName;

    @ApiProperty({ description: 'Website information' })
    website: {
        id: string;
        name: string;
    };

    @ApiProperty({ description: 'Website tracking ID' })
    trackingId: string;

    @ApiProperty({ description: 'User information' })
    user: EventInterface['user'];

    @ApiProperty({ description: 'Event context' })
    context: EventInterface['context'];

    @ApiProperty({ description: 'Traffic information' })
    traffic: EventInterface['traffic'];

    @ApiProperty({ description: 'Page information' })
    page: EventInterface['page'];

    @ApiProperty({ description: 'Event metrics' })
    metrics?: EventInterface['metrics'];
}
