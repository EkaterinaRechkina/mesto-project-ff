const token = "18e2bdec-08eb-442f-8281-54235c56275e";
const cohort = "pwff-cohort-1";

// const config = {
//     baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
//     headers: {
//       authorization: token,
//       'Content-Type': 'application/json'
//     }
//   }

const getUserData = () => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/users/me", {
    method: "GET",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  });
};

const editProfile = (name, job) => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/users/me ", {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  });
};

const initialCardsRender = () => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards", {
    method: "GET",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  });
};

const addNewCard = (name, link) => {
  return fetch("https://nomoreparties.co/v1/pwff-cohort-1/cards", {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};


const deleteMyCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${cardId}`,{
        method: 'DELETE',
        headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
    })
}


const putLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
    })
}


const deleteLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
    })
}


const updateUserAvatar = (link) => {
    return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: link,
          }),
    })
}




export { getUserData, initialCardsRender, editProfile, addNewCard, deleteMyCard, putLike, deleteLike, updateUserAvatar };
