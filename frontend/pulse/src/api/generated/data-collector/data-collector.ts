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
import type { CreateEventDto, EventResponseDto } from '.././models';
import { customInstance } from '../../axios-client';

/**
 * The event has been successfully collected
 * @summary Collect event data
 */
export const collectEvent = (
  createEventDto: CreateEventDto,
  signal?: AbortSignal,
) => {
  return customInstance<EventResponseDto>({
    url: `/data-collector/event`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: createEventDto,
    signal,
  });
};

export const getCollectEventMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof collectEvent>>,
    TError,
    { data: CreateEventDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof collectEvent>>,
  TError,
  { data: CreateEventDto },
  TContext
> => {
  const mutationKey = ['collectEvent'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof collectEvent>>,
    { data: CreateEventDto }
  > = (props) => {
    const { data } = props ?? {};

    return collectEvent(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type CollectEventMutationResult = NonNullable<
  Awaited<ReturnType<typeof collectEvent>>
>;
export type CollectEventMutationBody = CreateEventDto;
export type CollectEventMutationError = unknown;

/**
 * @summary Collect event data
 */
export const useCollectEvent = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof collectEvent>>,
    TError,
    { data: CreateEventDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof collectEvent>>,
  TError,
  { data: CreateEventDto },
  TContext
> => {
  const mutationOptions = getCollectEventMutationOptions(options);

  return useMutation(mutationOptions);
};
