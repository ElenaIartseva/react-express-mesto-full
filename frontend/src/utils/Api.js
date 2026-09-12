import { baseURL } from './config.js';
import { handleResponse } from './apiResponse.js';
import { fetchJson } from './fetchOptions.js';

class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  getAppInfo() {
    return Promise.all([this.getCards(), this.getUserIDInfo()]);
  }

  getCards() {
    return fetchJson(`${this._url}/cards`, 'GET')
      .then(handleResponse);
  }

  getUserIDInfo() {
    return fetchJson(`${this._url}/users/me`, 'GET')
      .then(handleResponse);
  }

  newCardData({ name, link }) {
    return fetchJson(`${this._url}/cards`, 'POST', { name, link })
      .then(handleResponse);
  }

  photoOfAvatar(avatar) {
    return fetchJson(`${this._url}/users/me/avatar`, 'PATCH', avatar)
      .then(handleResponse);
  }

  userInformation({ name, about }) {
    return fetchJson(`${this._url}/users/me`, 'PATCH', { name, about })
      .then(handleResponse);
  }

  addLike(cardID) {
    return fetchJson(`${this._url}/cards/${cardID}/likes`, 'PUT')
      .then(handleResponse);
  }

  deleteLike(cardID) {
    return fetchJson(`${this._url}/cards/${cardID}/likes`, 'DELETE')
      .then(handleResponse);
  }

  deleteCard(cardID) {
    return fetchJson(`${this._url}/cards/${cardID}`, 'DELETE')
      .then(handleResponse);
  }
}

export const api = new Api({ baseUrl: baseURL });
