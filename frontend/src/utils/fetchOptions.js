export function jsonFetchOptions(method = 'GET', body) {
  return {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };
}
