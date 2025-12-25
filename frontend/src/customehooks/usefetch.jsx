import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let isMount = true;
    async function DataFetch() {
      try {
        const response = await axios.get(url);
        if (isMount) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (isMount) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    DataFetch();
    return () => {
      isMount = false;
    };
  }, [url]);
  return { data, error, loading };
}
