import {cardtemplate} from './index'


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

export {createCard, deleteCard}