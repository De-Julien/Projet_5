let panier = []; // contient les informations des produits du panier.
let montant = 0; // contient le montant total du prix.
let Qte = 0; //  contient le nombre total de la quantité des produits du panier.
//construit le DOM en fonction du produit et permet de chercher dans les 2 tableaux opur récupérer les infos
const lePanier = async function () {
    const info = JSON.parse(localStorage.getItem("produits"));
    for (let i = 0; i < info.length; i++) {
        let infos = info[i];
        await fetch(`http://localhost:3000/api/products/${infos.id}`)
            .then(reponse => reponse.json())
            .then(data => panier = data);
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
        image.src = panier.imageUrl;
        image.alt = panier.altTxt;
        divImage.appendChild(image);
        const divBlock = document.createElement("div");
        divBlock.className = "cart__item__content";
        article.appendChild(divBlock);
        const divDescription = document.createElement("div");
        divDescription.className = "cart__item__content__description";
        divBlock.appendChild(divDescription);
        const titre = document.createElement("h2");
        titre.textContent = panier.name;
        divDescription.appendChild(titre);
        const paraCouleurs = document.createElement("p");
        paraCouleurs.textContent = infos.teinte;
        divDescription.appendChild(paraCouleurs);
        const paraPrix = document.createElement("p");
        paraPrix.textContent = `${panier.price},00 €`;
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

        let totalQte = document.getElementById("totalQuantity");
        Qte += parseInt(infos.nombre);
        totalQte.textContent = Qte;

        let totalPrix = document.getElementById("totalPrice");
        montant += (infos.nombre * panier.price);
        totalPrix.textContent = `${montant},00`;
        //permet de mettre à jour les quantités/prix quand on change la quantité du produit,le localsorage est aussi mis à jour. 
        input.addEventListener("change", function() {
            let information = info.find(p => article.id == p.id && article.color == p.teinte && p.nombre != input.value);
            Qte = Qte + parseInt(input.value) - parseInt((information.nombre));
            montant = montant + (input.value * panier.price) - (information.nombre * panier.price);
            information.nombre = input.value;
            localStorage.setItem("produits", JSON.stringify(info));
            totalQte.textContent = Qte; 
            totalPrix.textContent = `${montant},00`;
        })
        // Permet de supprimer la card-article du produit, de retirer le produit du localstorage et de mettre à jour le prix/quantité.
        paraDelete.addEventListener("click", function () {
            let information = JSON.parse(localStorage.getItem("produits")).filter(p => article.id != p.id || article.color != p.teinte);
            console.log(information);
            Qte = Qte - parseInt((input.value));
            article.remove();
            localStorage.setItem("produits", JSON.stringify(information));
            totalQte.textContent = Qte;
            montant = montant - (input.value * panier.price);
            totalPrix.textContent = `${montant},00`;
        })
    }
}
lePanier();