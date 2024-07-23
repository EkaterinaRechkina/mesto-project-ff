import "../pages/index.css";
import {
  createCard,
  deleteCard,
  handleFormSubmitCard,
  popupAddNewCard
} from "./card";
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
const popupCard = document.querySelector(".popup_type_image");
const cardImg = document.querySelector(".card__image");
const cardTitle = document.querySelector(".card__title");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// @todo: Вывести карточки на страницу
initialCards.forEach(
  (item) => cardPlace.append(createCard(item, deleteCard)), handleFormSubmitCard
 
);

profileEditBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

cardAddBtn.addEventListener("click", function (evt) {
  evt.preventDefault;
  openModal(popupAddNewCard);
});

function imageHandler(el) {
  popupImg.src = cardImg.src;
  popupCaption.textContent = cardTitle.textContent;
  openModal(popupCard);
}

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

cardAddForm.addEventListener("submit", handleFormSubmitCard);

export { cardtemplate };
