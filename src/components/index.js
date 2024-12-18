import "../pages/index.css";
import { createCard, deleteCard, isLiked } from "./card";
import { openModal, closeModal } from "./modal";
import {
  enableValidation,
  clearValidation,
} from "./validation";
import {
  getUserData,
  initialCardsRender,
  editProfile,
  addNewCard,
  updateUserAvatar,
} from "./api";

const validationConfig = { 
  formSelector: ".popup__form", 
  inputSelector: ".popup__input", 
  submitButtonSelector: ".popup__button", 
  inactiveButtonClass: "popup__button_disabled", 
  inputErrorClass: 'popup__input_type_error',
  errorClass: "popup__error_visible", 

}; 


//POPUP
const cardPlace = document.querySelector(".places__list");
const popupCloseList = document.querySelectorAll(".popup__close");
const popupList = document.querySelectorAll(".popup");
const popupCard = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaptionCard = document.querySelector(".popup__caption");
const popupInputCardLink = document.querySelector(".popup__input_type_url");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupAvatarUpdate = document.querySelector(".popup_type_new-avatar");

//PROFILE
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditForm = document.forms["edit-profile"];
const inputProfileName = profileEditForm.elements.name;
const inputProfileDescription = profileEditForm.elements.description;

//AddCard
const cardAddBtn = document.querySelector(".profile__add-button");
const cardAddForm = document.forms["new-place"];
const popupInputCardName = document.querySelector(
  ".popup__input_type_card-name"
);

// Обновление информации в профиле и закрытие модального окна

function profileHandler(evt) {
  evt.preventDefault();
  renderLoading(true);
  const nameInput = inputProfileName.value;
  const jobInput = inputProfileDescription.value;
  editProfile(nameInput, jobInput)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false));
  closeModal(popupProfileEdit);
}

// Добавляем новую карточку
let myUserId;

function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(true);
  const name = popupInputCardName.value;
  const link = popupInputCardLink.value;

  addNewCard(name, link)
    .then((data) => {
      const newCard = createCard(data, deleteCard, isLiked, openCard, myUserId);
      cardPlace.prepend(newCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false));

  closeModal(popupAddNewCard);
  evt.target.reset();
}

//OPEN CARD

function openCard(card) {
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupCaptionCard.textContent = card.name;
  openModal(popupCard);
}

//Promise all Данные из профиля + инициализация карточек

Promise.all([getUserData(), initialCardsRender()])
  .then(([userInfo, cards]) => {
    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    avatar.style.backgroundImage = `url('${userInfo.avatar}')`;
    myUserId = userInfo._id;
    cards.forEach((cardData) => {
      const card = createCard(
        cardData,
        deleteCard,
        isLiked,
        openCard,
        myUserId
      );
      cardPlace.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Обработчики

//Открываем модальное окно для редактирования профиля

profileEditBtn.addEventListener("click", function (evt) {
  clearValidation(profileEditForm, validationConfig);
  evt.preventDefault();
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

//Редактирование профиля

profileEditForm.addEventListener("submit", profileHandler);

// Открываем модальное окно для добавления карточки

cardAddBtn.addEventListener("click", function (evt) {
  evt.preventDefault;
  clearValidation(cardAddForm, validationConfig);
  popupInputCardName.value = "";
  popupInputCardLink.value = "";
  openModal(popupAddNewCard);
});

//Содание новой карточки

cardAddForm.addEventListener("submit", createNewCard);

//Обновление аватара

avatar.addEventListener("click", function (evt) {
  evt.preventDefault();

  openModal(popupAvatarUpdate);
});

function createAvatar(evt) {
  evt.preventDefault();
  renderLoading(true);
  const avatarInput = document.querySelector(".popup__input_type_avatar");
  const link = avatarInput.value;
  updateUserAvatar(link)
    .then((data) => {
      avatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false));
  closeModal(popupAvatarUpdate);
}

popupAvatarUpdate.addEventListener("submit", createAvatar);

//Закрытие popup

popupCloseList.forEach((element) => {
  element.addEventListener("click", function () {
    const closestPopup = element.closest(".popup");
    closeModal(closestPopup);
  });
});

//Закрытие popup overlay

popupList.forEach((element) => {
  element.addEventListener("click", function (evt) {
    if (!evt.target.matches(".popup__content")) {
      closeModal(evt.target);
    }
  });
});

//Валидация

enableValidation(validationConfig);

//Загрузка данных в форме

function renderLoading(isLoading) {
  const buttonSubmit = document.querySelector(".popup__button");
  buttonSubmit.textContent = isLoading ? "Сохранение..." : "Сохранить";
}
