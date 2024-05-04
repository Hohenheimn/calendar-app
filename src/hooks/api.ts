import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import envConfig from "../../config";

const apiBaseUrl = envConfig.API_BASE_URL;

export const useFetch = (
  apiUrl: string,
  queryKey: string[],
  enabled?: boolean
) => {
  return useQuery({
    queryFn: async () => {
      return axios
        .get(`${apiBaseUrl}${apiUrl}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(queryKey + " " + err);
          console.log(err?.message);
        });
    },
    queryKey: queryKey,
    enabled: enabled,
  });
};

export const usePost = (
  apiUrl: string,
  onSuccess: (data: AxiosResponse<any, any>) => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: (payload: any) => {
      return axios.post(`${apiBaseUrl}${apiUrl}`, payload);
    },
    onSuccess,
    onError,
  });
};

export const usePut = (
  apiUrl: string,
  onSuccess: (data: AxiosResponse<any, any>) => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: async (payload: any) => {
      return axios.put(`${apiBaseUrl}${apiUrl}`, payload);
    },
    onSuccess,
    onError,
  });
};

export const useDelete = (
  apiUrl: string,
  onSuccess: (data: AxiosResponse<any, any>) => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: async () => {
      return axios.delete(`${apiBaseUrl}${apiUrl}`);
    },
    onSuccess,
    onError,
  });
};
