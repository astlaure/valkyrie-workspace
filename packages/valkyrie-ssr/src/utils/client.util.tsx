import React from 'react';
import ReactDOM from 'react-dom/client';
import { FetchQueryProvider } from '../contexts/FetchQueryProvider';

export const clientUtil = {
  hydrate(jsx: React.ReactElement) {
    ReactDOM.hydrateRoot(
      document.querySelector('#root') as HTMLElement,
      <FetchQueryProvider initial={window.__APP_DATA__}>
        {jsx}
      </FetchQueryProvider>
    );
  }
}
