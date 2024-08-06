import "../pages/index.css";
import { createCard, deleteCard, isLiked, openCard } from "./card";
import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";

const cardtemplate = document.querySelector("#card-template").content;
const cardPlace = document.querySelector(".places__list");
const popupClose = document.querySelectorAll(".popup__close");

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

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>
  cardPlace.append(createCard(item, deleteCard, isLiked, openCard))
);

// Добавляем карточку

function createNewCard(evt) {
  evt.preventDefault();

  console.log("CREATE");

  const newCardEl = {
    name: popupInputCardName.value,
    link: popupInputCardLink.value,
  };

  const newCard = createCard(newCardEl, deleteCard, isLiked, openCard);
  cardPlace.prepend(newCard);
  closeModal(popupAddNewCard);
  evt.target.reset();
}

cardAddForm.addEventListener("submit", createNewCard);

//Открываем модальное окно для редактирования профиля

profileEditBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

// Открываем модальное окно для добавления карточки

cardAddBtn.addEventListener("click", function (evt) {
  evt.preventDefault;
  openModal(popupAddNewCard);
});

// Обновление информации в профиле и закрытие модального окна

function profileHandler(evt) {
  evt.preventDefault();
  const nameInput = inputProfileName.value;
  const jobInput = inputProfileDescription.value;
  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
  closeModal(popupProfileEdit);
}

profileEditForm.addEventListener("submit", profileHandler);

popupClose.forEach((element) => {
  element.addEventListener("click", function () {
    const closestPopup = element.closest(".popup");
    closeModal(closestPopup);
  });
});

export { cardtemplate };
