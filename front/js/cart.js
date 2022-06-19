const info = JSON.parse(localStorage.getItem("produits"));
//construit le DOM en fonction du produit et permet de chercher dans les 2 tableaux opur récupérer les infos
const lePanier = function (infoProduits) {
    for (let i = 0; i < info.length; i++) {
        let infos = info[i];
        console.log(infos);
        let information = infoProduits.find(produit => infos.id == produit._id);

        const section = document.querySelector("#cart__items");
        const article = document.createElement("article");
        article.className = "cart__item";
        article.id = infos.id;
        article.color = infos.teinte;
        section.appendChild(article);
        const divImage = document.createElement("div");
        divImage.className = "cart__item__img";
        article.appendChild(divImage);
        const image = document.createElement("img");
        image.src = information.imageUrl;
        image.alt = information.altTxt;
        divImage.appendChild(image);
        const divBlock = document.createElement("div");
        divBlock.className = "cart__item__content";
        article.appendChild(divBlock);
        const divDescription = document.createElement("div");
        divDescription.className = "cart__item__content__description";
        divBlock.appendChild(divDescription);
        const titre = document.createElement("h2");
        titre.textContent = information.name;
        divDescription.appendChild(titre);
        const paraCouleurs = document.createElement("p");
        paraCouleurs.textContent = infos.teinte;
        divDescription.appendChild(paraCouleurs);
        const paraPrix = document.createElement("p");
        paraPrix.textContent = `${information.price},00 €`;
        divDescription.appendChild(paraPrix);
        const divOption = document.createElement("div");
        divOption.className = "cart__item__content__settings";
        divBlock.appendChild(divOption);
        const divQuantiter = document.createElement("div");
        divQuantiter.className = "cart__item__content__settings__quantity";
        divOption.appendChild(divQuantiter);
        const paraQuantiter = document.createElement("p");
        paraQuantiter.textContent = "Qté :";
        divQuantiter.appendChild(paraQuantiter);
        const input = document.createElement("input");
        input.type = Number;
        input.className = "itemQuantity";
        input.name = "itemQuantity";
        input.min = 1;
        input.max = 100;
        input.value = infos.nombre;
        divQuantiter.appendChild(input);
        const divDelete = document.createElement("div");
        divDelete.className = "cart__item__content__settings__delete";
        divOption.appendChild(divDelete);
        const paraDelete = document.createElement("p");
        divDelete.appendChild(paraDelete);
        paraDelete.className = "deleteItem";
        paraDelete.textContent = "Supprimer";
    }
}
const Supprimer = document.querySelector("#deleteItem");
Supprimer.onclick = () => {
    
}

// récupération d'un tableau contenant les informations sur le serveur
fetch(`http://localhost:3000/api/products/`)
    .then(reponse => reponse.json())
    .then(data => lePanier(data))
    .catch(e => console.log("Il y a un problème avec " + e));