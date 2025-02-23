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

interface SwaggerRouteOptions {
  summary: string;
  operationId: string;
  bodyType?: any;
  responseType?: any;
  status?: number;
  description?: string;
  query?: Record<string, QueryParam>;
}

export function SwaggerRoute(options: SwaggerRouteOptions) {
  const {
    summary,
    operationId,
    responseType,
    bodyType,
    status = 200,
    description = '',
    query
  } = options;

  const decorators = [
    ApiOperation({
      summary,
      operationId,
      description
    }),
    ApiResponse({
      status,
      description,
      type: responseType
    })
  ];

  if (bodyType) {
    decorators.push(ApiBody({ type: bodyType }));
  }

  if (query) {
    Object.entries(query).forEach(([name, param]) => {
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