export function handleResponse(res) {
  return res.json()
    .catch(() => ({}))
    .then((data) => {
      if (res.ok) {
        return data;
      }
      const message = data.message || `Ошибка: ${res.status}`;
      return Promise.reject(new Error(message));
    });
}
