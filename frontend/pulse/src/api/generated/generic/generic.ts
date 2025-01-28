/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Pulse Analytics
 * Pulse Analytics API
 * OpenAPI spec version: 1.0
 */
import {
  useInfiniteQuery,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  InfiniteData,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { customInstance } from '../../axios-client';



export const genericControllerCreate = (
    
 ) => {
      
      
      return customInstance<void>(
      {url: `/sessions`, method: 'POST'
    },
      );
    }
  


export const getGenericControllerCreateMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof genericControllerCreate>>, TError,void, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof genericControllerCreate>>, TError,void, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof genericControllerCreate>>, void> = () => {
          

          return  genericControllerCreate()
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GenericControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof genericControllerCreate>>>
    
    export type GenericControllerCreateMutationError = unknown

    export const useGenericControllerCreate = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof genericControllerCreate>>, TError,void, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof genericControllerCreate>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getGenericControllerCreateMutationOptions(options);

      return useMutation(mutationOptions);
    }
    export const genericControllerFindAll = (
    
 signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/sessions`, method: 'GET', signal
    },
      );
    }
  

export const getGenericControllerFindAllQueryKey = () => {
    return [`/sessions`] as const;
    }

    
export const getGenericControllerFindAllInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof genericControllerFindAll>>>, TError = unknown>( options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof genericControllerFindAll>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGenericControllerFindAllQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof genericControllerFindAll>>> = ({ signal }) => genericControllerFindAll(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof genericControllerFindAll>>, TError, TData> & { queryKey: QueryKey }
}

export type GenericControllerFindAllInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof genericControllerFindAll>>>
export type GenericControllerFindAllInfiniteQueryError = unknown

export const useGenericControllerFindAllInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof genericControllerFindAll>>>, TError = unknown>(
  options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof genericControllerFindAll>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGenericControllerFindAllInfiniteQueryOptions(options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGenericControllerFindAllQueryOptions = <TData = Awaited<ReturnType<typeof genericControllerFindAll>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof genericControllerFindAll>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGenericControllerFindAllQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof genericControllerFindAll>>> = ({ signal }) => genericControllerFindAll(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof genericControllerFindAll>>, TError, TData> & { queryKey: QueryKey }
}

export type GenericControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof genericControllerFindAll>>>
export type GenericControllerFindAllQueryError = unknown

export const useGenericControllerFindAll = <TData = Awaited<ReturnType<typeof genericControllerFindAll>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof genericControllerFindAll>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGenericControllerFindAllQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const genericControllerFindOne = (
    id: string,
 signal?: AbortSignal
) => {
      
      
      return customInstance<void>(
      {url: `/sessions/${id}`, method: 'GET', signal
    },
      );
    }
  

export const getGenericControllerFindOneQueryKey = (id: string,) => {
    return [`/sessions/${id}`] as const;
    }

    
export const getGenericControllerFindOneInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof genericControllerFindOne>>>, TError = unknown>(id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof genericControllerFindOne>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGenericControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof genericControllerFindOne>>> = ({ signal }) => genericControllerFindOne(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseInfiniteQueryOptions<Awaited<ReturnType<typeof genericControllerFindOne>>, TError, TData> & { queryKey: QueryKey }
}

export type GenericControllerFindOneInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof genericControllerFindOne>>>
export type GenericControllerFindOneInfiniteQueryError = unknown

export const useGenericControllerFindOneInfinite = <TData = InfiniteData<Awaited<ReturnType<typeof genericControllerFindOne>>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof genericControllerFindOne>>, TError, TData>>, }

  ):  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGenericControllerFindOneInfiniteQueryOptions(id,options)

  const query = useInfiniteQuery(queryOptions) as  UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGenericControllerFindOneQueryOptions = <TData = Awaited<ReturnType<typeof genericControllerFindOne>>, TError = unknown>(id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof genericControllerFindOne>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGenericControllerFindOneQueryKey(id);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof genericControllerFindOne>>> = ({ signal }) => genericControllerFindOne(id, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(id), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof genericControllerFindOne>>, TError, TData> & { queryKey: QueryKey }
}

export type GenericControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof genericControllerFindOne>>>
export type GenericControllerFindOneQueryError = unknown

export const useGenericControllerFindOne = <TData = Awaited<ReturnType<typeof genericControllerFindOne>>, TError = unknown>(
 id: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof genericControllerFindOne>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGenericControllerFindOneQueryOptions(id,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const genericControllerUpdate = (
    id: string,
 ) => {
      
      
      return customInstance<void>(
      {url: `/sessions/${id}`, method: 'PUT'
    },
      );
    }
  


export const getGenericControllerUpdateMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof genericControllerUpdate>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof genericControllerUpdate>>, TError,{id: string}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof genericControllerUpdate>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  genericControllerUpdate(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GenericControllerUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof genericControllerUpdate>>>
    
    export type GenericControllerUpdateMutationError = unknown

    export const useGenericControllerUpdate = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof genericControllerUpdate>>, TError,{id: string}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof genericControllerUpdate>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getGenericControllerUpdateMutationOptions(options);

      return useMutation(mutationOptions);
    }
    export const genericControllerRemove = (
    id: string,
 ) => {
      
      
      return customInstance<void>(
      {url: `/sessions/${id}`, method: 'DELETE'
    },
      );
    }
  


export const getGenericControllerRemoveMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof genericControllerRemove>>, TError,{id: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof genericControllerRemove>>, TError,{id: string}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof genericControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  genericControllerRemove(id,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GenericControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof genericControllerRemove>>>
    
    export type GenericControllerRemoveMutationError = unknown

    export const useGenericControllerRemove = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof genericControllerRemove>>, TError,{id: string}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof genericControllerRemove>>,
        TError,
        {id: string},
        TContext
      > => {

      const mutationOptions = getGenericControllerRemoveMutationOptions(options);

      return useMutation(mutationOptions);
    }
    