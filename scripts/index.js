// @todo: Темплейт карточки

const cardtemplate = document.querySelector("#card-template").content;
const cardPlace = document.querySelector(".places__list");

// @todo: DOM узлы
// @todo: Функция создания карточки

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

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => cardPlace.append(createCard(item, deleteCard)));

// @todo: Функция удаления карточки

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}
