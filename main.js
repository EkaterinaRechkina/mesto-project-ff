(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n){var r=n.deleteCard,o=n.likedCard,c=n.openCard,d=e.querySelector(".card").cloneNode(!0),p=d.querySelector(".card__delete-button"),a=d.querySelector(".card__image"),u=d.querySelector(".card__title"),i=d.querySelector(".card__like-button");return u.textContent=t.name,a.src=t.link,a.alt=t.name,p.addEventListener("click",r),i.addEventListener("click",o),a.addEventListener("click",(function(){return c(t)})),d}function n(e){var t=document.querySelector(".popup_is-opened");"Esc"!==e.key&&"Escape"!==e.key||o(t)}function r(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",n)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}var c=document.querySelector(".places__list"),d=document.querySelectorAll(".popup__close"),p=document.querySelectorAll(".popup"),a=document.querySelector(".popup_type_image"),u=document.querySelector(".popup__image"),i=document.querySelector(".popup__caption"),l=document.querySelector(".popup_type_edit"),s=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),_=document.querySelector(".profile__edit-button"),y=document.forms["edit-profile"],v=y.elements.name,f=y.elements.description,k=document.querySelector(".profile__add-button"),q=document.forms["new-place"],S=document.querySelector(".popup__input_type_card-name"),g=document.querySelector(".popup__input_type_url"),E=document.querySelector(".popup_type_new-card"),L={deleteCard:function(e){e.target.closest(".card").remove()},isLiked:function(e){e.target.classList.toggle("card__like-button_is-active")},openCard:function(e){u.src=e.link,u.alt=e.name,i.textContent=e.name,r(a)}};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){return c.append(t(e,L))})),_.addEventListener("click",(function(e){e.preventDefault(),v.value=s.textContent,f.value=m.textContent,r(l)})),y.addEventListener("submit",(function(e){e.preventDefault();var t=v.value,n=f.value;s.textContent=t,m.textContent=n,o(l)})),k.addEventListener("click",(function(e){e.preventDefault,r(E)})),q.addEventListener("submit",(function(e){e.preventDefault();var n=t({name:S.value,link:g.value},L);c.prepend(n),o(E),e.target.reset()})),d.forEach((function(e){e.addEventListener("click",(function(){o(e.closest(".popup"))}))})),p.forEach((function(e){e.addEventListener("click",(function(e){e.target.matches(".popup__content")||o(e.target)}))}))})();