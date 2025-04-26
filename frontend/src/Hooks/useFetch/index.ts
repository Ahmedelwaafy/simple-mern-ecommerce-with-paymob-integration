//* these hooks is just a wrapper for apiClient to get benefit of builtin loading,error,success, ...etc states, if you don't need these states, you can use apiClient directly

export { default as useFetchData } from "./use-fetch-data";
export { default as usePostData } from "./use-post-data";
