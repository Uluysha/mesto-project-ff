const handleEscKey = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  }
};

// открытие
export const openModal = (modal) => {
  if (!modal) return;
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKey);
};

// закрытие
export const closeModal = (modal) => {
  if (!modal) return;
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKey);
};

// обработчики
export const setupModalCloseHandlers = (modal) => {
  if (!modal) return;

  // закрытие по крестику
  const closeButton = modal.querySelector('.popup__close');
  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(modal));
  }

  // закрытие вне контента
  modal.addEventListener('mousedown', (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
};