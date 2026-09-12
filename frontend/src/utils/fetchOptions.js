import { baseURL } from './config.js';

const CSRF_HEADER_NAME = 'X-CSRF-Token';
const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

let csrfToken = null;

async function getCsrfToken() {
  if (csrfToken) {
    return csrfToken;
  }

  const response = await fetch(`${baseURL}/csrf-token`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();

  if (!response.ok || !data.csrfToken) {
    throw new Error(data.message || 'Не удалось получить CSRF-токен');
  }

  csrfToken = data.csrfToken;
  return csrfToken;
}

export function clearCsrfToken() {
  csrfToken = null;
}

export async function jsonFetchOptions(method = 'GET', body) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (UNSAFE_METHODS.has(method)) {
    headers[CSRF_HEADER_NAME] = await getCsrfToken();
  }

  return {
    method,
    credentials: 'include',
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };
}

export async function fetchJson(url, method = 'GET', body) {
  return fetch(url, await jsonFetchOptions(method, body));
}
