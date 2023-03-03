import React, { useState } from "react";
import { FetchQueryContext, FetchQueryState } from "./FetchQueryContext";

interface Props {
  children: React.ReactNode;
  initial: { [key: string]: any };
}

export function FetchQueryProvider({ children, initial }: Props) {
  const [state, setState] = useState<FetchQueryState>({ ...initial });
  const [cache, setCache] = useState(() => {
    const result: any = {};
    Object.keys(initial).map(key => result[key] = Date.now());
    return result;
  });

  const getData = (key: string) => {
    return { data: state[key], cache: cache[key] };
  }

  const setData = (key: string, data: any) => {
    setState({ ...state, [key]: data });
    setCache({ ...cache, [key]: Date.now() });
  }

  return (
    <FetchQueryContext.Provider value={{ getData, setData }}>
      {children}
    </FetchQueryContext.Provider>
  );
}
