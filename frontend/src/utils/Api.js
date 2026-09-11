import { baseURL } from './config.js';
import { handleResponse } from './apiResponse.js';
import { jsonFetchOptions } from './fetchOptions.js';

class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  }

  getAppInfo() {
    return Promise.all([this.getCards(), this.getUserIDInfo()]);
  }

  getCards() {
    return fetch(`${this._url}/cards`, jsonFetchOptions('GET'))
      .then(handleResponse);
  }

  getUserIDInfo() {
    return fetch(`${this._url}/users/me`, jsonFetchOptions('GET'))
      .then(handleResponse);
  }

  newCardData({ name, link }) {
    return fetch(`${this._url}/cards`, jsonFetchOptions('POST', { name, link }))
      .then(handleResponse);
  }

  photoOfAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, jsonFetchOptions('PATCH', avatar))
      .then(handleResponse);
  }

  userInformation({ name, about }) {
    return fetch(`${this._url}/users/me`, jsonFetchOptions('PATCH', { name, about }))
      .then(handleResponse);
  }

  addLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, jsonFetchOptions('PUT'))
      .then(handleResponse);
  }

  deleteLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, jsonFetchOptions('DELETE'))
      .then(handleResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, jsonFetchOptions('DELETE'))
      .then(handleResponse);
  }
}

export const api = new Api({ baseUrl: baseURL });
