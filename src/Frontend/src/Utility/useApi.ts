import axios, { AxiosRequestConfig } from "axios";
import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from "react-query";
import Constants from "./Constants";

export default function useApi<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">
): UseQueryResult<TData, TError> {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    async (): Promise<TQueryFnData> => {
      return (await axios.get(import.meta.env.VITE_API_URL + url, getConfig())).data;
    },
    options
  );
}

export function getConfig(): AxiosRequestConfig {
  return {
    timeout: 10000,
    headers: {
      Authorization: "Bearer " + localStorage.getItem(Constants.AccessTokenKey),
    },
  };
}
