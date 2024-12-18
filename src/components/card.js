import { putLike, deleteLike, deleteMyCard } from "./api";

const cardtemplate = document.querySelector("#card-template").content;

function createCard(newCard, deleteCard, isLiked, openCard, userId) {
  const card = cardtemplate.querySelector(".card").cloneNode(true);
  const cardDeleteBtn = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeBtn = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-counter");
  if (userId !== newCard.owner._id) {
    cardDeleteBtn.classList.add("card__delete-button-invisiable");
  }

  cardTitle.textContent = newCard.name;
  cardImg.src = newCard.link;
  cardImg.alt = newCard.name;
  likeCounter.textContent = newCard.likes.length;

  // cardDeleteBtn.addEventListener("click", deleteCard);

  cardDeleteBtn.addEventListener("click", () => {
    deleteCard(card, newCard._id);
  });

  cardLikeBtn.addEventListener("click", () =>
    isLiked(cardLikeBtn, likeCounter, newCard._id)
  );

  if (newCard.likes.some((user) => user._id === userId)) {
    cardLikeBtn.classList.add("card__like-button_is-active");
  }

  cardImg.addEventListener("click", () => openCard(newCard));

  return card;
}

// @todo: Функция удаления карточки

 function deleteCard(card, cardId) {
  deleteMyCard(cardId).then(()=> {
      card.remove();
  })
      .catch((err) => {
          console.log(err);
      });
}


// LIKE

function isLiked(likeButton, likeCounter, cardId) {
  const likeMethod = likeButton.classList.contains('card__like-button_is-active')  ? deleteLike : putLike;
      likeMethod(cardId).then((data) => {
         likeCounter.textContent = data.likes.length;
         likeButton.classList.toggle('card__like-button_is-active');
      })
          .catch((err) => {
              console.log(err);
          });
}


export { createCard, deleteCard, isLiked, cardtemplate };
