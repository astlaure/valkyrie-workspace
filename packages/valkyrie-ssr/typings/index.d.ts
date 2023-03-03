export interface APP_DATA {
  [key: string]: any;
}

declare global {
  interface Window {
    __APP_DATA__: APP_DATA,
  }
}
