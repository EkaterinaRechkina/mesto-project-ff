const token = "18e2bdec-08eb-442f-8281-54235c56275e";
const cohort = "pwff-cohort-1";

// const config = {
//     baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
//     headers: {
//       authorization: token,
//       'Content-Type': 'application/json'
//     }
//   }

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__image");
const cardPlace = document.querySelector(".places__list");
// Вывести карточки на страницу
// initialCards.forEach((item) =>
//     cardPlace.append(createCard(item, deleteCard, isLiked, openCard))
//   );

const getUserData = () => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/users/me", {
    method: "GET",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      avatar.src = data.avatar;
    })
    .catch((err) => console.log(err));
};

const initialCardsRender = () => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards", {
    method: "GET",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
};

const editProfile = () => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/users/me ", {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Marie Skłodowska Curie",
      about: "Physicist and Chemist",
    }),
  });
};


const addNewCard =() => {
    return fetch('https://nomoreparties.co/v1/cohortId/cards', {
        method: 'POST',
        headers: {
            authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: 'test',
            link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
        })
    })
}


export { getUserData, initialCardsRender, editProfile, addNewCard };
