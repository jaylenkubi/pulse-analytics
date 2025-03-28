/**
 * Generated by orval v7.7.0 🍺
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

import type { SetupWebsiteDto, Website } from '.././models';

import { customInstance } from '../../axios-client';

/**
 * Creates a new website with tracking ID and enables selected features
 * @summary Set up a new website with tracking ID and features
 */
export const setupWebsite = (
  setupWebsiteDto: SetupWebsiteDto,
  signal?: AbortSignal,
) => {
  return customInstance<Website>({
    url: `/website-execution/setup`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: setupWebsiteDto,
    signal,
  });
};

export const getSetupWebsiteMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof setupWebsite>>,
    TError,
    { data: SetupWebsiteDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof setupWebsite>>,
  TError,
  { data: SetupWebsiteDto },
  TContext
> => {
  const mutationKey = ['setupWebsite'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof setupWebsite>>,
    { data: SetupWebsiteDto }
  > = (props) => {
    const { data } = props ?? {};

    return setupWebsite(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type SetupWebsiteMutationResult = NonNullable<
  Awaited<ReturnType<typeof setupWebsite>>
>;
export type SetupWebsiteMutationBody = SetupWebsiteDto;
export type SetupWebsiteMutationError = unknown;

/**
 * @summary Set up a new website with tracking ID and features
 */
export const useSetupWebsite = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof setupWebsite>>,
    TError,
    { data: SetupWebsiteDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof setupWebsite>>,
  TError,
  { data: SetupWebsiteDto },
  TContext
> => {
  const mutationOptions = getSetupWebsiteMutationOptions(options);

  return useMutation(mutationOptions);
};
