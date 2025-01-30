import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

export function SwaggerRoute(options: {
  summary: string;
  requestType?: Type<unknown>;
  responseType?: Type<unknown>;
  status?: number;
  description?: string;
}) {
  const decorators = [
    ApiOperation({ summary: options.summary }),
  ];

  if (options.requestType) {
    decorators.push(ApiBody({ type: options.requestType }));
  }

  if (options.responseType) {
    decorators.push(
      ApiResponse({
        status: options.status || 200,
        description: options.description || 'Success',
        type: options.responseType,
      }),
    );
  }

  return applyDecorators(...decorators);
}