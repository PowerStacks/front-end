export {};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // example: any; // 👈️ turn off type checking
  }
}

declare module '*.jpg';
declare module '*.png';