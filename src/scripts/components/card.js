const cardTmp = document.querySelector('#card-template').content;

// создание
export function createCard(item, onDelete, putLike, openPopupImg) {
    
    const card = cardTmp.querySelector('.card').cloneNode(true);
    const btnDelete = card.querySelector('.card__delete-button');
    const btnLike = card.querySelector('.card__like-button');
    const cardImage = card.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    card.querySelector('.card__title').textContent = item.name;
    
    cardImage.addEventListener('click', () => openPopupImg(item.name, item.link));

    btnDelete.addEventListener('click', () => onDelete(card));

    btnLike.addEventListener('click', putLike);
    return card;
};
// удаление
export function onDelete(card) {
    card.remove();
};
// лайк
export const putLike = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
};