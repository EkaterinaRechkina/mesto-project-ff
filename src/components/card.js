import { cardtemplate } from "./index";
import { closeModal } from "./modal";

function createCard(el, deleteCard) {
  const card = cardtemplate.querySelector(".card").cloneNode(true);
  const cardDeleteBtn = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = el.name;
  cardImg.src = el.link;
  cardImg.alt = el.name;
  cardDeleteBtn.addEventListener("click", deleteCard);
  return card;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// LIKE IS NOT WORKING

function isLiked(like) {
  like.classList.toggle(".card__like-button_is-active");
}

//ADD CARD

const cardAddForm = document.forms["new-place"];
const cardPlaceName = cardAddForm.elements["place-name"];
const cardLink = cardAddForm.elements.link;
const popupAddNewCard = document.querySelector(".popup_type_new-card");

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const place = cardPlaceName.value;
  const link = cardLink.value;
  const cardImg = document.querySelector(".card__image");
  const cardTitle = document.querySelector(".card__title");
  cardImg.src = link;
  cardTitle.textContent = place;
  closeModal(popupAddNewCard)
}


export { createCard, deleteCard,handleFormSubmitCard,popupAddNewCard };
