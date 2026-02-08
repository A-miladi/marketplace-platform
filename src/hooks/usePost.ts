import { useState } from "react";

interface UsePostResponse<TData, TResponse> {
  execute: (data: TData) => Promise<TResponse>;
  loading: boolean;
  error: Error | null;
}

export function usePost<TData, TResponse>(
  url: string,
): UsePostResponse<TData, TResponse> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = async (data: TData): Promise<TResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}
