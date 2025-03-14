/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import { useMutation } from '@tanstack/react-query';
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import type { CreateEventDto } from '.././models';
import { customInstance } from '../../axios-client';

/**
 * @summary Collect event data
 */
export const dataCollectorControllerCollectEvent = (
  createEventDto: CreateEventDto,
  signal?: AbortSignal,
) => {
  return customInstance<void>({
    url: `/data-collector/event`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: createEventDto,
    signal,
  });
};

export const getDataCollectorControllerCollectEventMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof dataCollectorControllerCollectEvent>>,
    TError,
    { data: CreateEventDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof dataCollectorControllerCollectEvent>>,
  TError,
  { data: CreateEventDto },
  TContext
> => {
  const mutationKey = ['dataCollectorControllerCollectEvent'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof dataCollectorControllerCollectEvent>>,
    { data: CreateEventDto }
  > = (props) => {
    const { data } = props ?? {};

    return dataCollectorControllerCollectEvent(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type DataCollectorControllerCollectEventMutationResult = NonNullable<
  Awaited<ReturnType<typeof dataCollectorControllerCollectEvent>>
>;
export type DataCollectorControllerCollectEventMutationBody = CreateEventDto;
export type DataCollectorControllerCollectEventMutationError = unknown;

/**
 * @summary Collect event data
 */
export const useDataCollectorControllerCollectEvent = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof dataCollectorControllerCollectEvent>>,
    TError,
    { data: CreateEventDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof dataCollectorControllerCollectEvent>>,
  TError,
  { data: CreateEventDto },
  TContext
> => {
  const mutationOptions =
    getDataCollectorControllerCollectEventMutationOptions(options);

  return useMutation(mutationOptions);
};
