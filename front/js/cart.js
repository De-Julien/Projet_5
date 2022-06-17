const section = document.querySelector("#cart__items");
const article = document.createElement("article");
article.className = "cart__item";
article.id = "";    // a remplire
article.color = ""; // a remplire
section.appendChild(article);
const divImage = document.createElement("div");
divImage.className = "cart__item__img";
article.appendChild(divImage);
const image = document.createElement("img");
image.src = "../images/logo.png" // a remplire
image.alt = ""; // a remplire
divImage.appendChild(image);
const divBlock = document.createElement("div");
divBlock.className = "cart__item__content";
article.appendChild(divBlock);
const divDescription = document.createElement("div");
divDescription.className = "cart__item__content__description";
divBlock.appendChild(divDescription);
const titre = document.createElement("h2");
titre.textContent = "5"; // a remplire
divDescription.appendChild(titre);
const paraCouleurs = document.createElement("p");
paraCouleurs.textContent = "4"; // a remplire
divDescription.appendChild(paraCouleurs);
const paraPrix = document.createElement("p");
paraPrix.textContent = "2"; // a remplire 
divDescription.appendChild(paraPrix);
const divOption = document.createElement("div");
divOption.className = "cart__item__content__settings";
divBlock.appendChild(divOption);
const divQuantiter = document.createElement("div");
divQuantiter.className = "cart__item__content__settings__quantity";
divOption.appendChild(divQuantiter);
const paraQuantiter = document.createElement("p");
paraQuantiter.textContent = "1"; // a remplire 
divQuantiter.appendChild(paraQuantiter);
const input = document.createElement("input");
input.type = Number;
input.className = "itemQuantity";
input.name = "itemQuantity";
input.min = 1;
input.max = 100;
input.value = 42;
divQuantiter.appendChild(input);
const divDelete = document.createElement("div");
divDelete.className = "cart__item__content__settings__delete";
divOption.appendChild(divDelete);
const paraDelete = document.createElement("p");//
divDelete.appendChild(paraDelete);
paraDelete.className = "deleteItem";
paraDelete.textContent = "Supprimer";



