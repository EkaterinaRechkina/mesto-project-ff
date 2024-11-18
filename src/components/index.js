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
  getUserData()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      avatar.src = data.avatar;
      // console.log(data._id); //ID user
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
  })
  .then((data) => {
    data.forEach((card) => {
      cardPlace.append(createCard(card, deleteCard, isLiked, openCard));
    });
  })
  .catch((err) => console.log(err));

// initialCards.forEach((item) =>
//   cardPlace.append(createCard(item, deleteCard, isLiked, openCard))
// );

// Добавляем новую карточку

function createNewCard(evt) {
  evt.preventDefault();
  renderLoading(true);
  const newCardEl = {
    name: popupInputCardName.value,
    link: popupInputCardLink.value,
  };

  addNewCard(newCardEl.name, newCardEl.link)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      const newCard = createCard(newCardEl, deleteCard, isLiked, openCard);
      cardPlace.prepend(newCard);
    })
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
  evt.preventDefault()
  const avatarInput = document.querySelector(".popup__input_type_avatar");
  const link = avatarInput.value;
  renderLoading(true);
  updateUserAvatar(link)
    .then((res) => {
      console.log('link',link)
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      avatar.src = data.avatar;
      console.log('data.avatar', data.avatar, avatar.src)
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false));
}

popupAvatarUpdate.addEventListener("submit", createAvatar);

const avatarInput = document.querySelector(".popup__input_type_avatar");

console.log(updateUserAvatar(avatarInput))


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
