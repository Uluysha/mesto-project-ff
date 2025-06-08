// импорт
import '../styles/index.css';
import {createCard, onDelete, putLike} from './components/card';
import {openModal, closeModal, setupModalCloseHandlers} from './components/modal';
import { enableValidation, clearValidation } from "./components/validation";
import {
  getInitialCards,
  getUserInfo,
  patchUserInfo ,
  patchAvatar,
  postCard,
  deleteCard
} from "./components/api";


//изменения профиля
const cardList = document.querySelector('.places__list');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCardImg = document.querySelector('.popup_type_image');
const popupImage = popupCardImg.querySelector('.popup__image');
const popupCaption = popupCardImg.querySelector('.popup__caption');
const popupAvatar = document.querySelector('.popup_type_new-avatar'); 
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addPlaceForm = document.forms['new-place'];
const placeNameInput = addPlaceForm.elements['place-name'];
const linkInput = addPlaceForm.elements.link;
const profileImage = document.querySelector('.profile__image');
const profileUpdateProfileImage = document.forms['new-avatar'];
const profileImageInput = profileUpdateProfileImage.elements.url;
const submitDeleteButton = popupDeleteCard.querySelector(".popup__button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive", //disabled?
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

// попап
const openPopupImg = (name, link) => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(popupCardImg);
};

let currentUserId = "";
let cardToDelete = null;
let selectorCardToDelete = null;

Promise.all([getUserInfo(), getInitialCards()])
  .then((results) => {
    const userData = results[0];
    const cardContainer = results[1];
    if (userData) {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      currentUserId = userData._id
    }
    if (cardContainer.length > 0) {
      cardContainer.forEach((element) => {
        const newCard = createCard(
          element,
          handleDeleteCard,
          putLike,
          openPopupImg,
          userData._id
        );
        cardList.append(newCard);
      });
    }
  })
  .catch((err) => {
    console.log(err);
});

btnEditProfile.addEventListener('click', () => {
    openModal(popupEditProfile)
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
});
btnAddCard.addEventListener('click', () => {
    openModal(popupAddCard);
    clearValidation(addPlaceForm, validationConfig);
});
profileImage.addEventListener('click', () => {
    openModal(popupAvatar);
    clearValidation(profileUpdateProfileImage, validationConfig);
});

setupModalCloseHandlers(popupEditProfile);
setupModalCloseHandlers(popupAddCard);
setupModalCloseHandlers(popupCardImg);
setupModalCloseHandlers(popupAvatar);
setupModalCloseHandlers(popupDeleteCard);

const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = profileForm.querySelector(".popup__button");
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    const data = {
        name: nameInput.value,
        about: jobInput.value
    };
    patchUserInfo(data)
        .then((user) => {
            profileTitle.textContent = user.name;
            profileDescription.textContent = user.about;
            closeModal(popupEditProfile);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            submitButton.textContent = "Сохранить";
            submitButton.disabled = false;            
        });
}
const handleEditFormProfileImageSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = profileUpdateProfileImage.querySelector(".popup__button");
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    const imageUrl = profileImageInput.value;
    patchAvatar(imageUrl)
        .then((user) => {
            profileImage.style.backgroundImage = `url('${user.avatar}')`;
            profileUpdateProfileImage.reset();
            closeModal(popupAvatar);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            submitButton.textContent = "Сохранить";
            submitButton.disabled = false;            
        });
}
const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = addPlaceForm.querySelector(".popup__button");
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;

    const name = placeNameInput.value;
    const link = linkInput.value;
    postCard(name, link)
        .then((card) => {
            cardList.prepend(createCard(card, handleDeleteCard, putLike, openPopupImg, currentUserId));
            addPlaceForm.reset();
            closeModal(popupAddCard);
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            submitButton.textContent = "Сохранить";
            submitButton.disabled = false;            
        });
}
const handleDeleteFormSubmit = () => {
    submitDeleteButton.textContent = "Удаляем...";
    submitDeleteButton.disabled = true;
    console.log(cardToDelete);

    deleteCard(cardToDelete._id)    
        .then(() => {
            onDelete(selectorCardToDelete);
            closeModal(popupDeleteCard);
            cardToDelete = null;
            selectorCardToDelete = null; 
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            submitDeleteButton.textContent = "Да";
            submitDeleteButton.disabled = false;           
        });
}
const handleDeleteCard = (card, cardSelector) => {
    cardToDelete = card;
    selectorCardToDelete = cardSelector;
    openModal(popupDeleteCard);
}
profileForm.addEventListener('submit', handleEditFormSubmit);
addPlaceForm.addEventListener('submit', handleAddFormSubmit);
profileUpdateProfileImage.addEventListener('submit', handleEditFormProfileImageSubmit);
submitDeleteButton.addEventListener('click', handleDeleteFormSubmit)

enableValidation(validationConfig);