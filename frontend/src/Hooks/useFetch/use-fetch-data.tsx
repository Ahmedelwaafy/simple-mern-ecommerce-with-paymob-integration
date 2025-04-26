"use client";

import apiClient from "@/services/api";
import type { ApiConfigOptions } from "@/types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

interface QueryConfig<TResponse, TResponseTransformed = TResponse>
  extends ApiConfigOptions<TResponse> {
  queryOptions?: Omit<
    UseQueryOptions<TResponse, Error, TResponseTransformed>,
    "queryKey" | "queryFn"
  >;
}

// TResponseTransformed is used when we want to transform the response data using select, so select returns different structure than the default received response
export default function useFetchData<
  TResponse,
  TResponseTransformed = TResponse
>(endpoint: string, config: QueryConfig<TResponse, TResponseTransformed> = {}) {
  const { params, query, onSuccess, onError, body, queryOptions } = config;
  const queryKey = [
    endpoint,
    ...[params && params, query && query].filter(Boolean),
  ];

  return useQuery<TResponse, Error, TResponseTransformed>({
    queryKey,
    queryFn: () =>
      apiClient<TResponse>(endpoint, {
        params,
        query,
        onSuccess,
        onError,
        body,
      }).then((res) => res.data),
    ...queryOptions,
  });
}
