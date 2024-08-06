import { cardtemplate } from "./index";
import { openModal } from "./modal";

function createCard(el, deleteCard, liked, open) {
  const card = cardtemplate.querySelector(".card").cloneNode(true);
  const cardDeleteBtn = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeBtn = card.querySelector(".card__like-button");

  cardTitle.textContent = el.name;
  cardImg.src = el.link;
  cardImg.alt = el.name;
  cardDeleteBtn.addEventListener("click", deleteCard);
  cardLikeBtn.addEventListener("click", liked);
  cardImg.addEventListener("click", open);

  return card;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// LIKE 

function isLiked(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

//OPEN CARD
const popupCard = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function openCard(evt) {
  popupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openModal(popupCard);
}

export { createCard, deleteCard, isLiked, openCard };
