const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
    headers: {
        authorization: '5f985b03-e1ea-467e-8154-e24150a34320',
        'Content-Type': 'application/json'
    }
};

const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
  })
  .then(handleResponse)
};

export const postCard = (name, link) => {
    return fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(handleResponse)
};

export const deleteCard = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
    .then(handleResponse)
};

export const getUserInfo = () => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'GET',
        headers: apiConfig.headers
    })
    .then(handleResponse)
};

export const patchUserInfo = (data) => {
    return fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about
        })
    })
    .then(handleResponse)
};

export const patchAvatar = (link) => {
    return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: apiConfig.headers,
        body: JSON.stringify({
           avatar: link
        })
    })
    .then(handleResponse)
};

export const putCardLike = (cardId) => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: apiConfig.headers
    })
    .then(handleResponse)
};

export const deleteCardLike = (cardId)  => {
    return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: apiConfig.headers
    })
    .then(handleResponse)
};