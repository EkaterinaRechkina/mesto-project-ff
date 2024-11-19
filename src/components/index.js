import "../pages/index.css";
import { createCard, deleteCard, isLiked, cardtemplate } from "./card";
import { openModal, closeModal } from "./modal";
import { enableValidation, clearValidation } from "./validation";
import {
  getUserData,
  initialCardsRender,
  editProfile,
  addNewCard,
  deleteMyCard,
  putLike,
  deleteLike,
  updateUserAvatar,
} from "./api";

//POPUP
const cardPlace = document.querySelector(".places__list");
const popupCloseList = document.querySelectorAll(".popup__close");
const popupList = document.querySelectorAll(".popup");
const popupCard = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaptionCard = document.querySelector(".popup__caption");
const popupInputCardLink = document.querySelector(".popup__input_type_url");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const popupAvatarUpdate = document.querySelector(".popup_type_new-avatar");

//PROFILE
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
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

//Задание данных в профиле

function createUser() {
  let userID;
  getUserData()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      avatar.src = data.avatar;
      userID = data._id;
    })
    .catch((err) => console.log(err));
}

createUser();

// Обновление информации в профиле и закрытие модального окна

function profileHandler(evt) {
  evt.preventDefault();
  renderLoading(true);
  const nameInput = inputProfileName.value;
  const jobInput = inputProfileDescription.value;
  editProfile(nameInput, jobInput)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false));
  closeModal(popupProfileEdit);
}

// Вывести карточки на страницу

initialCardsRender()
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    data.forEach((card) => {
      cardPlace.append(createCard(card, deleteCard, isLiked, openCard));
    });
  })
  .catch((err) => console.log(err));

//Promise all Данные из профиля + инициализация карточек

Promise.all([createUser, initialCardsRender])
  .then((resUser, resCard) => {
    console.log(resUser, resCard);
  })
  .catch((err) => console.log(err));

// Добавляем новую карточку

function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(true);
  const name = popupInputCardName.value;
  const link = popupInputCardLink.value;

  addNewCard(name, link)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(name, link);
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      const newCardEl = {
        name: data.name,
        link: data.link,
      };
      const newCard = createCard(newCardEl, deleteCard, isLiked, openCard);
      cardPlace.prepend(newCard);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false));

  closeModal(popupAddNewCard);
  evt.target.reset();
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
  clearValidation(profileEditForm);
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
  clearValidation(cardAddForm);
  popupInputCardName.value = "";
  popupInputCardLink.value = "";
  openModal(popupAddNewCard);
});

//Содание новой карточки

cardAddForm.addEventListener("submit", createNewCard);

//Обновление аватара

avatar.addEventListener("click", function (evt) {
  evt.preventDefault();

  openModal(popupAvatarUpdate);
});

function createAvatar(evt) {
  evt.preventDefault();
  renderLoading(true);
  const avatarInput = document.querySelector(".popup__input_type_avatar");
  const link = avatarInput.value;
  updateUserAvatar(link)
    .then((res) => {
      console.log("link", link);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      avatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false));
  closeModal(popupAvatarUpdate);
}

popupAvatarUpdate.addEventListener("submit", createAvatar);

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

//Загрузка данных в форме

function renderLoading(isLoading) {
  const buttonSubmit = document.querySelector(".popup__button");
  if (isLoading) {
    buttonSubmit.textContent = "Сохранение...";
  } else {
    buttonSubmit.textContent = "Сохранить";
  }
}
