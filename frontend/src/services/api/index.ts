import { ApiConfigOptions, ApiError, ApiResponse } from "@/types";
import { toast } from "sonner";
import { getLanguageAndToken } from "./getLanguageAndToken";
import endpoints from "./endpoints";
import Cookies from "js-cookie";
import { routes } from "@/Constants/Routes";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

const IsServerSide = typeof window === "undefined";

export const apiClient = async <TResponse = any, TBody = any>(
  endpointName: string,
  options: ApiConfigOptions<TResponse, TBody> = {},
  dynamicEndpoint?: string
): Promise<ApiResponse<TResponse>> => {
  const { params, query, body, onSuccess, onError, signal } = options;
  const { lang, token } = await getLanguageAndToken();
  const userToken = token;
  const endpoint = endpoints[endpointName];

  if (!endpoint && !dynamicEndpoint)
    throw new Error(`Endpoint ${endpointName} not found`);

  let { url } = endpoint;

  // Replace URL params
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, String(value));
    });
  }

  // Add query parameters
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    lang,
    //...(userToken && { Authorization: `Bearer ${userToken}` }),
  };

  const headers = { ...defaultHeaders, ...endpoint.config?.headers };

  const fetchInit: RequestInit = {
    ...endpoint.config,
    headers,
    signal,
    credentials: "include",
  };

  if (body) {
    if (headers["Content-Type"] === "application/json") {
      fetchInit.body = JSON.stringify(body);
    } else if (headers["Content-Type"] === "multipart/form-data") {
      delete headers["Content-Type"]; // Let the browser set it
      const formData = new FormData();

      // Map over the body and append fields correctly
      Object.entries(body).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value); // Append files directly
        } else if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value)); // Convert objects to JSON strings
        } else {
          formData.append(key, String(value)); // Convert other values to strings
        }
      });

      fetchInit.body = formData as BodyInit;
    }
  }
  //console.log("apiClient ...", { url, fetchInit });

  try {
    //console.log("apiClient fetching ...", { url });
    const response = await fetch(
      dynamicEndpoint ? dynamicEndpoint : `${BASE_URL}${url}`,
      fetchInit
    );

    //console.log("apiClient response ...", { response });
    if (!response.ok) {
      const err: ApiResponse = await response.json();

      //console.log("apiClient ...", { err });

      // Mimicking Axios error structure
      const error: ApiError = new Error(err.msg || "An error occurred");
      error.response = {
        data: {
          ...err,
        },
      };
      throw error;
    }
    const data: ApiResponse<TResponse> = await response.json();
    //console.log("apiClient ...", { data });
    if (
      (endpoint.config?.showToasts || endpoint.config?.showSuccessToast) &&
      !IsServerSide
    ) {
      toast.success(
        data.msg
          ? data.msg
          : lang === "en"
          ? "Operation done successfully"
          : "تم تنفيذ العملية بنجاح"
      );
    }
    onSuccess?.(data);
    return data;
  } catch (error: ApiError | any) {
    if (error?.response?.data?.status === 401) {
      Cookies.remove("Auth-State");
      window.location.replace(`/${lang}${routes.signin}`);
      //TODO: hit sign-out endpoint to remove the invalid token, if the token still persists in the cookie
    }
    if (endpoint.config?.showToasts || endpoint.config?.showErrorToast) {
      toast.error(error.message || "An error occurred");
    }

    onError?.(error);
    if (endpoint.config?.throwError) {
      throw error;
    }
    return error?.response?.data;
  }
};

export default apiClient;
