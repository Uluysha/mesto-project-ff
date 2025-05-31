// импорт
import './index.css';
import {initialCards} from './components/cards';
import {createCard, onDelete, putLike} from './components/card';
import {openModal, closeModal, setupModalCloseHandlers} from './components/modal';
//изменения профиля
const cardList = document.querySelector('.places__list');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCardImg = document.querySelector('.popup_type_image');
const popupImage = popupCardImg.querySelector('.popup__image');
const popupCaption = popupCardImg.querySelector('.popup__caption');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addPlaceForm = document.forms['new-place'];
const placeNameInput =addPlaceForm.elements['place-name'];
const linkInput = addPlaceForm.elements.link;
// попап
const openPopupImg = (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupCardImg);
};
//карточки
initialCards.forEach((item) => {
    const card = createCard(item, onDelete, putLike, openPopupImg);
    cardList.append(card);
});

btnEditProfile.addEventListener('click', () => {
    openModal(popupEditProfile)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
});
btnAddCard.addEventListener('click', () => {
    openModal(popupAddCard);
});

setupModalCloseHandlers(popupEditProfile);
setupModalCloseHandlers(popupAddCard);
setupModalCloseHandlers(popupCardImg);

const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile);
}
const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    const newCard = {
        name: placeNameInput.value,
        link: linkInput.value,
    };
    cardList.prepend(createCard(newCard, onDelete, putLike, openPopupImg));
    closeModal(popupAddCard);
    addPlaceForm.reset();
}
profileForm.addEventListener('submit', handleEditFormSubmit);
addPlaceForm.addEventListener('submit', handleAddFormSubmit);