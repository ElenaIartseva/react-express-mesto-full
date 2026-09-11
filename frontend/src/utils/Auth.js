import { baseURL } from './config.js';
import { handleResponse } from './apiResponse.js';
import { jsonFetchOptions } from './fetchOptions.js';

export { baseURL };

export const register = ({ email, password }) => fetch(
  `${baseURL}/signup`,
  jsonFetchOptions('POST', { email, password }),
).then(handleResponse);

export const login = ({ email, password }) => fetch(
  `${baseURL}/signin`,
  jsonFetchOptions('POST', { email, password }),
).then(handleResponse);

export const logout = () => fetch(
  `${baseURL}/signout`,
  jsonFetchOptions('POST'),
).then(handleResponse);

export const checkToken = () => fetch(
  `${baseURL}/users/me`,
  jsonFetchOptions('GET'),
).then(handleResponse);
