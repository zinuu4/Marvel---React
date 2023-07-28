import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [process, setProcess] = useState("waiting");

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body = null,
      headers = { "Content-Type": "application/json" }
    ) => {
      setLoading(true);
      setProcess("loading");

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        setLoading(false);

        return data;
      } catch (error) {
        setLoading(false);

        if (error && typeof error === "object" && "message" in error) {
          setError(error.message);
        } else {
          setError("An error occurred");
        }

        setProcess("error");
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
    setProcess("waiting");
  }, []);

  return { loading, request, error, clearError, process, setProcess };
};
