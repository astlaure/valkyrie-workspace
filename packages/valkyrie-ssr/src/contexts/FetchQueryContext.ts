import React from "react";

export interface FetchQueryState {
  [key: string]: any;
}

type Context = { getData: (key: string) => any, setData: (key: string, data: any) => any };

export const FetchQueryContext = React.createContext<Context>({ getData: () => {}, setData: () => {} });
