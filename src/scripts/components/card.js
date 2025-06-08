import {deleteCardLike, putCardLike} from './api'

const cardTmp = document.querySelector('#card-template').content;

// создание
export function createCard(item, onDeleteHandle, putLike, openPopupImg, userId) {
    
    const card = cardTmp.querySelector('.card').cloneNode(true);
    const btnDelete = card.querySelector('.card__delete-button');
    const btnLike = card.querySelector('.card__like-button');
    const cardImage = card.querySelector('.card__image');
    const likesCounter = card.querySelector('.card__like-counter');

    cardImage.src = item.link;
    cardImage.alt = item.name;
    likesCounter.textContent = item.likes.length;

    if (item.owner._id !== userId) {
        btnDelete.style.display = 'none';
    } else {
        btnDelete.addEventListener('click', () => onDeleteHandle(item, card)); 
    }

    card.querySelector('.card__title').textContent = item.name;
    
    cardImage.addEventListener('click', () => openPopupImg(item.name, item.link));

    if (item.likes.some((like) => like._id == userId)) {
        btnLike.classList.toggle('card__like-button_is-active')
    }
    btnLike.addEventListener('click', () => putLike(item._id, btnLike, likesCounter));
    
    return card;
};
// удаление
export function onDelete(card) {
    card.remove();
};
// лайк
export const putLike = (cardId, btnLike, likesCounter) => {
    const isLike = btnLike.classList.contains('card__like-button_is-active');
    if (isLike) {
        deleteCardLike(cardId)
            .then((card) => {
                btnLike.classList.toggle('card__like-button_is-active');
                likesCounter.textContent = card.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    } else {
        putCardLike(cardId)
            .then((card) => {
                btnLike.classList.toggle('card__like-button_is-active');
                likesCounter.textContent = card.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }
};