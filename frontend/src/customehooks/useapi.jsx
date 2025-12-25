import { useState } from "react";
import api from "../api/api";

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async ({ url, method = "GET", data = null }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method,
        url,
        data,
      });

      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  return { request, loading, error };
}
