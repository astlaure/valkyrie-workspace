import React from "react";
import ReactDOM from 'react-dom/server';
import { FetchQueryProvider } from "../contexts/FetchQueryProvider";

// const template = fs.readFileSync('public/index.html', { encoding: 'utf-8' });

export const serverUtil = {
  template: '',

  render (data: any, jsx: React.ReactElement) {
    const html = ReactDOM.renderToString(
      <FetchQueryProvider initial={data}>
        {jsx}
      </FetchQueryProvider>
    );

    return this.template
      .replace('<!--APP_ROOT-->', html)
      .replace('<!--APP_DATA-->', `window.__APP_DATA__ = ${JSON.stringify(data)};`);
  },
}
