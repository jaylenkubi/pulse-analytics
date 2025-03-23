/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

import type {
  AccessLevelFeatureDto,
  AccessLevelFeatureResponseDto,
  CreateFeatureDto,
  FeatureResponseDto,
  UpdateFeatureDto,
  WebsiteFeatureDto,
  WebsiteFeatureResponseDto,
} from '.././models';

import { customInstance } from '../../axios-client';

/**
 * Creates a new feature in the system. Admin access required.
 * @summary Create a new feature
 */
export const createFeature = (
  createFeatureDto: CreateFeatureDto,
  signal?: AbortSignal,
) => {
  return customInstance<FeatureResponseDto>({
    url: `/features`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: createFeatureDto,
    signal,
  });
};

export const getCreateFeatureMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createFeature>>,
    TError,
    { data: CreateFeatureDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof createFeature>>,
  TError,
  { data: CreateFeatureDto },
  TContext
> => {
  const mutationKey = ['createFeature'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof createFeature>>,
    { data: CreateFeatureDto }
  > = (props) => {
    const { data } = props ?? {};

    return createFeature(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type CreateFeatureMutationResult = NonNullable<
  Awaited<ReturnType<typeof createFeature>>
>;
export type CreateFeatureMutationBody = CreateFeatureDto;
export type CreateFeatureMutationError = unknown;

/**
 * @summary Create a new feature
 */
export const useCreateFeature = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof createFeature>>,
    TError,
    { data: CreateFeatureDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof createFeature>>,
  TError,
  { data: CreateFeatureDto },
  TContext
> => {
  const mutationOptions = getCreateFeatureMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Retrieves all features in the system. Admin access required.
 * @summary Get all features
 */
export const getAllFeatures = (signal?: AbortSignal) => {
  return customInstance<FeatureResponseDto[]>({
    url: `/features`,
    method: 'GET',
    signal,
  });
};

export const getGetAllFeaturesQueryKey = () => {
  return [`/features`] as const;
};

export const getGetAllFeaturesQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllFeatures>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getAllFeatures>>,
    TError,
    TData
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetAllFeaturesQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllFeatures>>> = ({
    signal,
  }) => getAllFeatures(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getAllFeatures>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetAllFeaturesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAllFeatures>>
>;
export type GetAllFeaturesQueryError = unknown;

/**
 * @summary Get all features
 */

export function useGetAllFeatures<
  TData = Awaited<ReturnType<typeof getAllFeatures>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getAllFeatures>>,
    TError,
    TData
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetAllFeaturesQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Retrieves all features for a specific website. Admin access required.
 * @summary Get all features by websiteId
 */
export const getAllFeaturesByWebsiteId = (
  websiteId: string,
  signal?: AbortSignal,
) => {
  return customInstance<FeatureResponseDto[]>({
    url: `/features/website/${websiteId}`,
    method: 'GET',
    signal,
  });
};

export const getGetAllFeaturesByWebsiteIdQueryKey = (websiteId: string) => {
  return [`/features/website/${websiteId}`] as const;
};

export const getGetAllFeaturesByWebsiteIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getAllFeaturesByWebsiteId>>,
  TError = unknown,
>(
  websiteId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getAllFeaturesByWebsiteId>>,
      TError,
      TData
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetAllFeaturesByWebsiteIdQueryKey(websiteId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getAllFeaturesByWebsiteId>>
  > = ({ signal }) => getAllFeaturesByWebsiteId(websiteId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!websiteId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getAllFeaturesByWebsiteId>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetAllFeaturesByWebsiteIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getAllFeaturesByWebsiteId>>
>;
export type GetAllFeaturesByWebsiteIdQueryError = unknown;

/**
 * @summary Get all features by websiteId
 */

export function useGetAllFeaturesByWebsiteId<
  TData = Awaited<ReturnType<typeof getAllFeaturesByWebsiteId>>,
  TError = unknown,
>(
  websiteId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getAllFeaturesByWebsiteId>>,
      TError,
      TData
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetAllFeaturesByWebsiteIdQueryOptions(
    websiteId,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Retrieves a feature by its name. Admin access required.
 * @summary Get a feature by name
 */
export const getFeatureByName = (name: string, signal?: AbortSignal) => {
  return customInstance<FeatureResponseDto>({
    url: `/features/name/${name}`,
    method: 'GET',
    signal,
  });
};

export const getGetFeatureByNameQueryKey = (name: string) => {
  return [`/features/name/${name}`] as const;
};

export const getGetFeatureByNameQueryOptions = <
  TData = Awaited<ReturnType<typeof getFeatureByName>>,
  TError = unknown,
>(
  name: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getFeatureByName>>,
      TError,
      TData
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetFeatureByNameQueryKey(name);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getFeatureByName>>
  > = ({ signal }) => getFeatureByName(name, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!name,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getFeatureByName>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetFeatureByNameQueryResult = NonNullable<
  Awaited<ReturnType<typeof getFeatureByName>>
>;
export type GetFeatureByNameQueryError = unknown;

/**
 * @summary Get a feature by name
 */

export function useGetFeatureByName<
  TData = Awaited<ReturnType<typeof getFeatureByName>>,
  TError = unknown,
>(
  name: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getFeatureByName>>,
      TError,
      TData
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetFeatureByNameQueryOptions(name, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Updates an existing feature by name. Admin access required.
 * @summary Update a feature
 */
export const updateFeature = (
  name: string,
  updateFeatureDto: UpdateFeatureDto,
) => {
  return customInstance<FeatureResponseDto>({
    url: `/features/name/${name}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: updateFeatureDto,
  });
};

export const getUpdateFeatureMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateFeature>>,
    TError,
    { name: string; data: UpdateFeatureDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof updateFeature>>,
  TError,
  { name: string; data: UpdateFeatureDto },
  TContext
> => {
  const mutationKey = ['updateFeature'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof updateFeature>>,
    { name: string; data: UpdateFeatureDto }
  > = (props) => {
    const { name, data } = props ?? {};

    return updateFeature(name, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type UpdateFeatureMutationResult = NonNullable<
  Awaited<ReturnType<typeof updateFeature>>
>;
export type UpdateFeatureMutationBody = UpdateFeatureDto;
export type UpdateFeatureMutationError = unknown;

/**
 * @summary Update a feature
 */
export const useUpdateFeature = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof updateFeature>>,
    TError,
    { name: string; data: UpdateFeatureDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof updateFeature>>,
  TError,
  { name: string; data: UpdateFeatureDto },
  TContext
> => {
  const mutationOptions = getUpdateFeatureMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Deletes a feature by name. Admin access required.
 * @summary Delete a feature
 */
export const deleteFeature = (name: string) => {
  return customInstance<void>({
    url: `/features/name/${name}`,
    method: 'DELETE',
  });
};

export const getDeleteFeatureMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteFeature>>,
    TError,
    { name: string },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteFeature>>,
  TError,
  { name: string },
  TContext
> => {
  const mutationKey = ['deleteFeature'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteFeature>>,
    { name: string }
  > = (props) => {
    const { name } = props ?? {};

    return deleteFeature(name);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteFeatureMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteFeature>>
>;

export type DeleteFeatureMutationError = unknown;

/**
 * @summary Delete a feature
 */
export const useDeleteFeature = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteFeature>>,
    TError,
    { name: string },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof deleteFeature>>,
  TError,
  { name: string },
  TContext
> => {
  const mutationOptions = getDeleteFeatureMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Enables and configures a feature for a specific website. Admin or website owner access required.
 * @summary Enable/Configure a feature for a website
 */
export const enableFeatureForWebsite = (
  websiteFeatureDto: WebsiteFeatureDto,
  signal?: AbortSignal,
) => {
  return customInstance<WebsiteFeatureResponseDto>({
    url: `/features/website`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: websiteFeatureDto,
    signal,
  });
};

export const getEnableFeatureForWebsiteMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof enableFeatureForWebsite>>,
    TError,
    { data: WebsiteFeatureDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof enableFeatureForWebsite>>,
  TError,
  { data: WebsiteFeatureDto },
  TContext
> => {
  const mutationKey = ['enableFeatureForWebsite'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof enableFeatureForWebsite>>,
    { data: WebsiteFeatureDto }
  > = (props) => {
    const { data } = props ?? {};

    return enableFeatureForWebsite(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type EnableFeatureForWebsiteMutationResult = NonNullable<
  Awaited<ReturnType<typeof enableFeatureForWebsite>>
>;
export type EnableFeatureForWebsiteMutationBody = WebsiteFeatureDto;
export type EnableFeatureForWebsiteMutationError = unknown;

/**
 * @summary Enable/Configure a feature for a website
 */
export const useEnableFeatureForWebsite = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof enableFeatureForWebsite>>,
    TError,
    { data: WebsiteFeatureDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof enableFeatureForWebsite>>,
  TError,
  { data: WebsiteFeatureDto },
  TContext
> => {
  const mutationOptions = getEnableFeatureForWebsiteMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Retrieves all features configured for a specific website. Admin or website owner access required.
 * @summary Get features for a website
 */
export const getWebsiteFeatures = (websiteId: string, signal?: AbortSignal) => {
  return customInstance<WebsiteFeatureResponseDto[]>({
    url: `/features/website/${websiteId}/features`,
    method: 'GET',
    signal,
  });
};

export const getGetWebsiteFeaturesQueryKey = (websiteId: string) => {
  return [`/features/website/${websiteId}/features`] as const;
};

export const getGetWebsiteFeaturesQueryOptions = <
  TData = Awaited<ReturnType<typeof getWebsiteFeatures>>,
  TError = unknown,
>(
  websiteId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getWebsiteFeatures>>,
      TError,
      TData
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetWebsiteFeaturesQueryKey(websiteId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getWebsiteFeatures>>
  > = ({ signal }) => getWebsiteFeatures(websiteId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!websiteId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getWebsiteFeatures>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetWebsiteFeaturesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getWebsiteFeatures>>
>;
export type GetWebsiteFeaturesQueryError = unknown;

/**
 * @summary Get features for a website
 */

export function useGetWebsiteFeatures<
  TData = Awaited<ReturnType<typeof getWebsiteFeatures>>,
  TError = unknown,
>(
  websiteId: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getWebsiteFeatures>>,
      TError,
      TData
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetWebsiteFeaturesQueryOptions(websiteId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * Sets permissions for a feature based on access level. Admin or website owner access required.
 * @summary Set access level permissions for a feature
 */
export const setFeatureAccessLevel = (
  accessLevelFeatureDto: AccessLevelFeatureDto,
  signal?: AbortSignal,
) => {
  return customInstance<AccessLevelFeatureResponseDto>({
    url: `/features/access-level`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: accessLevelFeatureDto,
    signal,
  });
};

export const getSetFeatureAccessLevelMutationOptions = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof setFeatureAccessLevel>>,
    TError,
    { data: AccessLevelFeatureDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof setFeatureAccessLevel>>,
  TError,
  { data: AccessLevelFeatureDto },
  TContext
> => {
  const mutationKey = ['setFeatureAccessLevel'];
  const { mutation: mutationOptions } = options
    ? options.mutation &&
      'mutationKey' in options.mutation &&
      options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey } };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof setFeatureAccessLevel>>,
    { data: AccessLevelFeatureDto }
  > = (props) => {
    const { data } = props ?? {};

    return setFeatureAccessLevel(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type SetFeatureAccessLevelMutationResult = NonNullable<
  Awaited<ReturnType<typeof setFeatureAccessLevel>>
>;
export type SetFeatureAccessLevelMutationBody = AccessLevelFeatureDto;
export type SetFeatureAccessLevelMutationError = unknown;

/**
 * @summary Set access level permissions for a feature
 */
export const useSetFeatureAccessLevel = <
  TError = unknown,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof setFeatureAccessLevel>>,
    TError,
    { data: AccessLevelFeatureDto },
    TContext
  >;
}): UseMutationResult<
  Awaited<ReturnType<typeof setFeatureAccessLevel>>,
  TError,
  { data: AccessLevelFeatureDto },
  TContext
> => {
  const mutationOptions = getSetFeatureAccessLevelMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * Retrieves all access level permissions for a specific feature. Admin or website owner access required.
 * @summary Get access levels for a feature
 */
export const getFeatureAccessLevels = (
  featureName: string,
  signal?: AbortSignal,
) => {
  return customInstance<AccessLevelFeatureResponseDto[]>({
    url: `/features/access-level/${featureName}`,
    method: 'GET',
    signal,
  });
};

export const getGetFeatureAccessLevelsQueryKey = (featureName: string) => {
  return [`/features/access-level/${featureName}`] as const;
};

export const getGetFeatureAccessLevelsQueryOptions = <
  TData = Awaited<ReturnType<typeof getFeatureAccessLevels>>,
  TError = unknown,
>(
  featureName: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getFeatureAccessLevels>>,
      TError,
      TData
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getGetFeatureAccessLevelsQueryKey(featureName);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getFeatureAccessLevels>>
  > = ({ signal }) => getFeatureAccessLevels(featureName, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!featureName,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof getFeatureAccessLevels>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetFeatureAccessLevelsQueryResult = NonNullable<
  Awaited<ReturnType<typeof getFeatureAccessLevels>>
>;
export type GetFeatureAccessLevelsQueryError = unknown;

/**
 * @summary Get access levels for a feature
 */

export function useGetFeatureAccessLevels<
  TData = Awaited<ReturnType<typeof getFeatureAccessLevels>>,
  TError = unknown,
>(
  featureName: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof getFeatureAccessLevels>>,
      TError,
      TData
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetFeatureAccessLevelsQueryOptions(
    featureName,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
