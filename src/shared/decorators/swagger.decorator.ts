import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Type } from '@nestjs/common';

interface QueryParam {
  type: 'string' | 'number' | 'boolean';
  format?: string;
  minimum?: number;
  maximum?: number;
  default?: any;
  required?: boolean;
}

export function SwaggerRoute(options: {
  summary: string;
  operationId?: string;
  requestType?: Type<unknown>;
  responseType?: Type<unknown>;
  status?: number;
  description?: string;
  query?: Record<string, QueryParam>;
}) {
  const decorators = [
    ApiOperation({ 
      summary: options.summary,
      operationId: options.operationId
    }),
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

  if (options.query) {
    Object.entries(options.query).forEach(([name, param]) => {
      decorators.push(
        ApiQuery({
          name,
          type: param.type,
          required: param.required !== false,
          ...param
        })
      );
    });
  }

  return applyDecorators(...decorators);
}