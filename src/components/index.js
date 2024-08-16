import "../pages/index.css";
import { createCard, deleteCard, isLiked, cardtemplate } from "./card";
import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";

const cardPlace = document.querySelector(".places__list");
const popupCloseList = document.querySelectorAll(".popup__close");
const popupList = document.querySelectorAll(".popup");
const popupCard = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaptionCard = document.querySelector(".popup__caption");

//PROFILE
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
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
const popupInputCardLink = document.querySelector(".popup__input_type_url");
const popupAddNewCard = document.querySelector(".popup_type_new-card");

// Вывести карточки на страницу
initialCards.forEach((item) =>
  cardPlace.append(createCard(item, deleteCard, isLiked, openCard))
);

// Добавляем новую карточку

function createNewCard(evt) {
  evt.preventDefault();
  const newCardEl = {
    name: popupInputCardName.value,
    link: popupInputCardLink.value,
  };

  const newCard = createCard(newCardEl, deleteCard, isLiked, openCard);
  cardPlace.prepend(newCard);
  closeModal(popupAddNewCard);
  evt.target.reset();
}

// Обновление информации в профиле и закрытие модального окна

function profileHandler(evt) {
  evt.preventDefault();
  const nameInput = inputProfileName.value;
  const jobInput = inputProfileDescription.value;
  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
  closeModal(popupProfileEdit);
}

//OPEN CARD

function openCard(card) {
  popupImg.src = card.link;
  popupImg.alt = card.name;
  popupCaptionCard.textContent = card.name;
  openModal(popupCard);
}

// Обработчики

//Открываем модальное окно для редактирования профиля

profileEditBtn.addEventListener("click", function (evt) {
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
  openModal(popupAddNewCard);
});

//Содание новой карточки

cardAddForm.addEventListener("submit", createNewCard);

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



enableValidation();

// очистка ошибок валидации вызовом clearValidation

//  clearValidation(profileForm, validationConfig); 