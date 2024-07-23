const popup = document.querySelectorAll(".popup");

function closePopupEsc(evt) {
  const openPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Esc" || evt.key === "Escape") {
    console.log("ESC");
    closeModal(openPopup);
  }
}

//Close by overlay

popup.forEach((element) => {
  element.addEventListener("click", function (evt) {
    if (!evt.target.matches(".popup__content")) {
      closeModal(evt.target);
    }
  });
});

function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupEsc);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

export { openModal, closeModal };
