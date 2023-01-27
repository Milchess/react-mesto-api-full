import React from "react";

class Api extends React.Component {
    constructor(props) {
        super(props);

        this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-51/';
        this._headers = {
            authorization: '38f4a1b9-fdca-415d-86b5-0f7384ead109',
            'Content-Type': 'application/json'
        }
        this._baseUrlAuth = 'https://auth.nomoreparties.co/';
    }

    _get(link) {
        return fetch(this._baseUrl + link, {
            method: 'GET',
            headers: this._headers,
        })
            .then((res) => this._getResponseData(res))
    }

    _post(link, model) {
        return fetch(this._baseUrl + link, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(model)
        })
            .then((res) => this._getResponseData(res))
    }

    _patch(link, model) {
        return fetch(this._baseUrl + link, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(model)
        })
            .then((res) => this._getResponseData(res))
    }

    _put(link) {
        return fetch(this._baseUrl + link, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((res) => this._getResponseData(res))
    }

    _delete(link) {
        return fetch(this._baseUrl + link, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => this._getResponseData(res))
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return this._get('cards');
    }

    getUserInformation() {
        return this._get('users/me');
    }

    setUserUpdate(model) {
        return this._patch('users/me', model);
    }

    setCreateCard(model) {
        return this._post('cards', model);
    }

    setDeleteCard(cardId) {
        return this._delete(`cards/${cardId}`);
    }

    setUserAvatar(model) {
        return this._patch('users/me/avatar', model);
    }

    changeLikeCardStatus(cardId, like) {
        if (like) {
           return this._put(`cards/${cardId}/likes`);
        } else {
           return this._delete(`cards/${cardId}/likes`)
        }
    }

    setRegistration(model) {
        return fetch(`${this._baseUrlAuth}signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(model)
        })
            .then((res) => this._getResponseData(res))
    }

    getAuthorization(model) {
        return fetch(`${this._baseUrlAuth}signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(model)
        })
            .then((res) => this._getResponseData(res))
    }

    getValidationToken() {
        return fetch(`${this._baseUrlAuth}users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => this._getResponseData(res))
    }
}

const api = new Api();

export default api;