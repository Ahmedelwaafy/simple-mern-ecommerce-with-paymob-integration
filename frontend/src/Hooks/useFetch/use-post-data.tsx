"use client";

import apiClient from "@/services/api";
import { ApiConfigOptions, ApiError, ApiResponse } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface MutateOptions<TBody, TResponse> {
  body: TBody;
  params?: Record<string, string | number>;
  query?: Record<string, string>;
  onSuccessFromMutate?: (data: TResponse) => void;
  onErrorFromMutate?: (error: any) => void;
}

interface MutationConfig<TResponse, TBody>
  extends Omit<ApiConfigOptions<TResponse>, "body" | "params" | "query"> {
  showToasts?: boolean;
  mutationOptions?: Omit<
    UseMutationOptions<
      ApiResponse<TResponse>,
      ApiError,
      MutateOptions<TBody, TResponse>
    >,
    "mutationFn" | "onSuccess" | "onError"
  >;
}
export default function usePostData<TResponse = unknown, TBody = unknown>(
  endpoint: string,
  config: MutationConfig<TResponse, TBody> = {}
) {
  const { onSuccess, onError, mutationOptions, accessToken } = config;

  return useMutation<
    ApiResponse<TResponse>,
    ApiError,
    MutateOptions<TBody, TResponse>
  >({
    mutationFn: async ({ body, params, query }) => {
      return apiClient<TResponse, TBody>(endpoint, {
        body,
        params,
        query,
        onSuccess,
        onError,
        accessToken,
      });
    },
    /*  onSuccess: (data, variables, context) => {
      if (showToasts) {
        toast.success(data.msg || "Operation successful");
      }
      console.log("Mutation successful", data);
      onSuccess?.(data);
    },
    onError: (error, variables, context) => {
      if (showToasts) {
        toast.error(error.message || "An error occurred");
      }
      onError?.(error);
      console.error("Mutation error:", error);
    }, */
    ...mutationOptions,
  });
}
//* in usePostData , the apiClient gets the endpoint from the usePostData itself, and gets the body, params, query from the mutate function, and onSuccess and onError passed to the apiClient, whereas we no longer catch errors outside the apiClient, so we won't trow errors from it
//* showToasts can be set in the endpoint config object
//*we can extract onSuccess and onError from the mutationOptions, put we decided to accept them in the usePostData config object for consistency with its neighbors hooks structure and also the apiClient structure (accept endpoint name and config object)
