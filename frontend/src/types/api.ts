export type ApiResponse<T = any> = {
  status: number;
  msg: string;
  data: T;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface EndpointConfig {
  url: string;
  config?: {
    method: HttpMethod;
    headers?: Record<string, string>;
    cache?: RequestCache;
    redirectOnError?: boolean;
    showToasts?: boolean;
    showSuccessToast?: boolean;
    showErrorToast?: boolean;
    propagateServerError?: boolean;
    throwError?: boolean;
  };
}
export interface ApiConfigOptions<TResponse = any, TBody = any> {
  params?: Record<string, string | number>;
  query?: Record<string, string>;
  body?: TBody;
  signal?: AbortSignal;
  accessToken?: string;
  onSuccess?: (data: ApiResponse<TResponse>) => void;
  onError?: (error: ApiError) => void;
  next?: {
    tags?: string[];
    revalidate?: number | false;
  };
}

export type ApiError = Error & {
  response?: {
    data: ApiResponse;
  };
};
export type OriginalApiError = {
  statusCode: number;
  message: string;
  error: string;
};

type Meta = {
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

type Links = {
  first: string;
  previous: string;
  next: string;
  last: string;
  current: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
  links: Links;
}

export type Option = { label: string; value: string };
