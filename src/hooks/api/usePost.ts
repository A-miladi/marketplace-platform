/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { USER_TOKEN } from "@/constants";
import API from "@/services";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useCallback, useState } from "react";

interface UsePostOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UsePostResult<T, P> {
  loading: boolean;
  execute: (payload: P) => Promise<T | void>;
}

export const usePost = <T, P>(
  url: string,
  options: UsePostOptions<T> = {},
): UsePostResult<T, P> => {
  const { onSuccess, onError } = options;

  const token = Cookies.get(USER_TOKEN);

  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (payload: P | FormData): Promise<T | void> => {
      setLoading(true);
      try {
        const isFormData = payload instanceof FormData;

        const headers = isFormData
          ? {
              "Content-Type": "multipart/form-data",
              Authorization: token ? `Bearer ${token}` : "",
            }
          : {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            };

        const response = await API.post<T>(url, payload, { headers });
        onSuccess?.(response.data);
        return response.data;
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          const errorMessage =
            err.response?.data?.message || err.message || "An error occurred";
          onError?.(errorMessage);
        } else if (err instanceof Error) {
          const errorMessage = err.message || "An unexpected error occurred";
          onError?.(errorMessage);
        } else {
          const errorMessage = "An unknown error occurred";
          onError?.(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    },
    [url, onSuccess, onError],
  );

  return { loading, execute };
};
