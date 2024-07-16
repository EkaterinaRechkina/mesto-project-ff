// @todo: Темплейт карточки

const cardtemplate = document.querySelector("#card-template").content;
const cardPlace = document.querySelector(".places__list");

// @todo: DOM узлы
// @todo: Функция создания карточки

function createCard(el, deleteCard) {
  const card = cardtemplate.querySelector(".card").cloneNode(true);
  const cardDeleteBtn = card.querySelector(".card__delete-button");
  let cardImg = card.querySelector(".card__image");
  let cardTitle = card.querySelector(".card__title");
  cardTitle.textContent = el.name;
  cardImg.src = el.link;
  cardDeleteBtn.addEventListener("click", deleteCard);
  return card;
}

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => cardPlace.append(createCard(item, deleteCard)));

// @todo: Функция удаления карточки

function deleteCard() {
  const cardDeleteBtn = document.querySelector(".card__delete-button");
  const item = cardDeleteBtn.closest(".card");
  item.remove();
}
