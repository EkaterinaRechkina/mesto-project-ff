import "../pages/index.css";
import { createCard, deleteCard } from "./card";
import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";

const cardtemplate = document.querySelector("#card-template").content;
const cardPlace = document.querySelector(".places__list");
const popupCard = document.querySelector(".popup_type_image");
const popup = document.querySelector('.popup');
const popupClose = document.querySelectorAll('.popup__close')

//PROFILE
const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditForm = document.forms["edit-profile"];
const inputProfileName = profileEditForm.elements.name;
const inputProfileDescription = profileEditForm.elements.description;

//AddCard
const cardAddBtn = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const cardAddForm = document.forms["new-place"];
const cardPlaceName= cardAddForm.elements['place-name'];
const cardLink = cardAddForm.elements.link;


// Like
const likeBtn = cardtemplate.querySelectorAll('.card__like-button');



// @todo: Вывести карточки на страницу
initialCards.forEach((item) => cardPlace.append(createCard(item, deleteCard)));

profileEditBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  inputProfileName.value = profileTitle.textContent;
  inputProfileDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

cardAddBtn.addEventListener("click", function (evt) {
  evt.preventDefault;
  openModal(popupAddNewCard);
});

function imageHandler(el) {
  openModal(popupCard);
}

function profileHandler(evt) {
  evt.preventDefault();
  const nameInput = inputProfileName.value;
  const jobInput = inputProfileDescription.value;
  profileTitle.textContent = nameInput;
  profileDescription.textContent = jobInput;
  closeModal(popupProfileEdit)
}

function cardHadler(){
    evt.preventDefault();
    
    closeModal(popupAddNewCard)
}


profileEditForm.addEventListener("submit", profileHandler);
cardAddForm.addEventListener("submit", cardHadler);


popupClose.forEach((element) => {
element.addEventListener('click',function(){
    const closestPopup = element.closest('.popup');
        closeModal(closestPopup)
    })
})


//Close by overlay
window.onclick = (evt) => {
    if(!evt.target.matches('.popup__content')){
        closeModal(evt.target)
    }
}


// LIKE IS NOT WORKING

function isLiked(like){
    console.log('TESSSSSSSSSSS')
    return like.classList.add('.card__like-button_is-active');
}

likeBtn.forEach((element)=> {
    element.addEventListener('click', function(){
        const card = element.closest('.card');
        isLiked(card)
    })
})


export { cardtemplate };
