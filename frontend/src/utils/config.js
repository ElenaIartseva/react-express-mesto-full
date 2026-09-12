const defaultBaseURL = typeof window === 'undefined'
  ? 'http://localhost:3000'
  : `http://${window.location.hostname}:3000`;

export const baseURL = import.meta.env.VITE_API_URL || defaultBaseURL;
