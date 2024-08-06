function closePopupEsc(evt) {
  const openPopup = document.querySelector(".popup_is-opened");
  if (evt.key === "Esc" || evt.key === "Escape") {
    closeModal(openPopup);
  }
}

function openModal(element) {
  element.classList.add("popup_is-opened");
  element.classList.add("popup_is-animated");
  document.addEventListener("keydown", closePopupEsc);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupEsc);
}

export { openModal, closeModal };
