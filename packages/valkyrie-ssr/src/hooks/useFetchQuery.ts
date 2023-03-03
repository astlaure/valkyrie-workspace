import { useContext, useEffect, useState } from "react";
import { FetchQueryContext } from "../contexts/FetchQueryContext";

/**
 *
 * @param key Provider's data key
 * @param url Api endpoint
 * @param options Fetch options object
 * @param deps useEffect dependencies array. default = []
 * @param caching caching time in milliseconds, set to 0 to disable caching. default to 5 minutes
 */
export function useFetchQuery<T>(
  key: string,
  url: string,
  options: RequestInit,
  deps: any[] = [],
  caching: number = 1000 * 60 * 5,
) {
  const { getData, setData } = useContext(FetchQueryContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error|undefined>(undefined);

  useEffect(() => {
    if (window.__APP_DATA__[key]) {
      delete window.__APP_DATA__[key];
      return;
    }

    if (getData(key).cache > Date.now() - caching) {
      return;
    }

    setLoading(true);
    setError(undefined);

    const controller = new AbortController();

    fetch(url, {
      ...options,
      signal: controller.signal,
    })
      .then(response => response.json())
      .then(json => setData(key, json))
      .catch(err => setError(err))
      .then(() => setLoading(false));

    return () => {
      controller.abort();
    }
  }, deps)

  return { data: getData(key).data as T, loading, error };
}
