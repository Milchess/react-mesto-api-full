export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__user',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const cardConfig = {
    cardSelector: '.grid-card',
    titleSelector: '.grid-card__title',
    imageSelector: '.grid-card__image',
    likeButtonSelector: '.grid-card__like',
    buttonDeleteSelector: '.grid-card__delete',
    likeQuantitySelector: '.grid-card__like-quantity',
    likeActiveSelector: 'grid-card__like_active',
}

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');
export const cardTemplate = document.querySelector('#grid-card-template');
export const avatar = document.querySelector('.profile__avatar-button');