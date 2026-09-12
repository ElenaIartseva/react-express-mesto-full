import { baseURL } from './config.js';
import { handleResponse } from './apiResponse.js';
import { clearCsrfToken, fetchJson } from './fetchOptions.js';

export { baseURL };

export const register = ({ email, password }) => fetchJson(
  `${baseURL}/signup`,
  'POST',
  { email, password },
).then(handleResponse);

export const login = ({ email, password }) => fetchJson(
  `${baseURL}/signin`,
  'POST',
  { email, password },
).then(handleResponse);

export const logout = () => fetchJson(
  `${baseURL}/signout`,
  'POST',
).then(handleResponse)
  .finally(clearCsrfToken);

export const checkToken = () => fetchJson(
  `${baseURL}/users/me`,
  'GET',
).then(handleResponse);
