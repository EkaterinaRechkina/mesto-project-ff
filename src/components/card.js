const cardtemplate = document.querySelector("#card-template").content;

function createCard(newCard, { deleteCard, likedCard, openCard }) {
  const card = cardtemplate.querySelector(".card").cloneNode(true);
  const cardDeleteBtn = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeBtn = card.querySelector(".card__like-button");

  cardTitle.textContent = newCard.name;
  cardImg.src = newCard.link;
  cardImg.alt = newCard.name;
  cardDeleteBtn.addEventListener("click", deleteCard);
  cardLikeBtn.addEventListener("click", likedCard);
  cardImg.addEventListener("click", () => openCard(newCard));

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

export { createCard, deleteCard, isLiked, cardtemplate };
