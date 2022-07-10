/**   fonction construire le DOM en fonction des articles.
    * @param {String} local
    * @param {String} api
*/
function creationDom(local, api) {
    const section = document.querySelector("#cart__items");
    const article = document.createElement("article");
    article.className = "cart__item";
    article.id = local.id;
    article.color = local.teinte;
    section.appendChild(article);
    const divImage = document.createElement("div");
    divImage.className = "cart__item__img";
    article.appendChild(divImage);
    const image = document.createElement("img");
    image.src = api.imageUrl;
    image.alt = api.altTxt;
    divImage.appendChild(image);
    const divBlock = document.createElement("div");
    divBlock.className = "cart__item__content";
    article.appendChild(divBlock);
    const divDescription = document.createElement("div");
    divDescription.className = "cart__item__content__description";
    divBlock.appendChild(divDescription);
    const titre = document.createElement("h2");
    titre.textContent = api.name;
    divDescription.appendChild(titre);
    const paraCouleurs = document.createElement("p");
    paraCouleurs.textContent = local.teinte;
    divDescription.appendChild(paraCouleurs);
    const paraPrix = document.createElement("p");
    paraPrix.textContent = `${api.price},00 €`;
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
    input.value = local.nombre;
    divQuantiter.appendChild(input);
    const divDelete = document.createElement("div");
    divDelete.className = "cart__item__content__settings__delete";
    divOption.appendChild(divDelete);
    const paraDelete = document.createElement("p");
    divDelete.appendChild(paraDelete);
    paraDelete.className = "deleteItem";
    paraDelete.textContent = "Supprimer";
    /** écoute les changement de valeur sur input.value et modifient les quantités/prix.
    */
    input.addEventListener("change", function () {
        let information = infoLocal.find(p => article.id == p.id && article.color == p.teinte && p.nombre != input.value);
        information.nombre = input.value;
        localStorage.setItem("produits", JSON.stringify(infoLocal));
        totalQuantite(infoLocal, infoApi);
        totalPrix();
    })
    /** écoute le bouton supprimer et modifient les quantités/prix.
    */
    paraDelete.addEventListener("click", function () {
        let information = JSON.parse(localStorage.getItem("produits")).filter(p => article.id != p.id || article.color != p.teinte);
        article.remove();
        localStorage.setItem("produits", JSON.stringify(information));
        let modifInfoApi = infoApi.filter(p => article.id != p.id || article.color != p.teinte);
        infoApi = modifInfoApi;
        totalQuantite(information);
        totalPrix();
    })
}

/**   fonction qui calcul la quantité total.
    * @param {Array} quantites
*/
function totalQuantite(tableau) {
    infoLocal = JSON.parse(localStorage.getItem("produits"));
    let totalQte = document.getElementById("totalQuantity");
    let qte = 0;
    for (let i = 0; i < tableau.length; i++) {
        let resultatQ = tableau[i];
        qte += parseInt(resultatQ.nombre);
        totalQte.textContent = qte;
    }
}
/** fonction qui calcul le prix total.
 */
function totalPrix() {
    infoLocal = JSON.parse(localStorage.getItem("produits"));
    montant = 0;
    for (let i = 0; i < infoLocal.length; i++) {
        let infos = infoLocal[i];
        let information = infoApi.find(p => infos.id == p._id);
        montant += (parseInt(infos.nombre) * parseInt(information.price));
        leTotal.textContent = `${montant},00`;
    }
}

let infoLocal = JSON.parse(localStorage.getItem("produits"));
let leTotal = document.getElementById("totalPrice");
let montant = 0;
let infoApi = [];
/** Récupération des informations sur le produit et créer les cards produit.
 */
const lesProduits = async function () {
    for (let i = 0; i < infoLocal.length; i++) {
        let infos = infoLocal[i];
        await fetch(`http://localhost:3000/api/products/${infos.id}`)
            .catch(() => alert("Le serveur est déconnecté !!"))
            .then(reponse => {
                /** Si la requête est Ok.
                */
                if (reponse.status == 200) {
                    return reponse.json()
                    /** Si un produit dans le localStorage n'est pas reconnu.
                     */
                } else if (reponse.status == 404) {
                    let mauvaisProduit = infoLocal.filter(p => infos.id != p.id && infos.teinte != p.teinte);
                    console.log(mauvaisProduit);
                    localStorage.setItem("produits", JSON.stringify(mauvaisProduit));
                    alert("Un des produits de votre panier n'existe pas, il va être supprimé !!");
                    throw new Error
                }
            })
            .then(data => {
                infoLocal.sort();
                infoApi.push(data);
                creationDom(infos, data);
                totalQuantite(infoLocal);
                montant += (parseInt(infos.nombre) * parseInt(data.price));
                leTotal.textContent = `${montant},00`;
            })
            .catch((err) => {

            })
    }
}

lesProduits();

/**  fonction pour vérifier les valeurs entrées dans le formulaire.
    * @param {String} regex
    * @param {String} value
    * @param {String} idMsg
    * @param {String} msg
    * @return {Promise}
*/
function valider(regex, value, idMsg, msg) {
    let requis = new RegExp(regex);
    let verif = requis.test(value);
    /** Si la vérification de la regex est fausse, affiche le message d'erreur.
     */
    if (verif == false) {
        document.getElementById(idMsg).textContent = msg;
        document.getElementById(idMsg).style.display = "block";
        return false;
        /** Si la vérification de la regex est vrai, retire le message d'erreur.
         */
    } else {
        document.getElementById(idMsg).style.display = "none";
        return true;
    }
}
const prenom = document.querySelector("#firstName");
const nom = document.querySelector("#lastName");
const adresse = document.querySelector("#address");
const ville = document.querySelector("#city");
const email = document.querySelector("#email");
let prenomValide = false;
let nomValide = false;
let adresseValide = false;
let villeValide = false;
let emailValide = false;
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
}
let products = [];
/**  fonction qui récupère l'ID ds produit du local storage.
 */
function infoLocalId() {
    for (let i = 0; i < infoLocal.length; i++) {
        let infos = infoLocal[i].id;
        products.push(infos);
    }
}
const panierInfoClient = {
    contact: contact,
    products: products
}
/**  Ecoute le champ prenom du formulaire.
 */
prenom.addEventListener("change", function () {
    prenomValide = valider("^[a-zA-Z]+-{0,1}[a-zA-Z]+$", prenom.value, "firstNameErrorMsg", "le prénom n'est pas valide !")
    contact.firstName = prenom.value;
});
/**  Ecoute le champ nom du formulaire.
 */
nom.addEventListener("change", function () {
    nomValide = valider("^[a-zA-Z]{2,}$", nom.value, "lastNameErrorMsg", "le nom n'est pas valide !")
    contact.lastName = nom.value;
});
/**  Ecoute le champ adresse du formulaire.
 */
adresse.addEventListener("change", function () {
    adresseValide = valider("^[a-zA-Z0-9- _]{5,}$", adresse.value, "addressErrorMsg", "l'adresse n'est pas valide !")
    contact.address = adresse.value;
});
/**  Ecoute le champ ville du formulaire.
 */
ville.addEventListener("change", function () {
    villeValide = valider("^[a-zA-Z- ]{2,}$", ville.value, "cityErrorMsg", "la ville n'est pas valide !")
    contact.city = ville.value;
});
/**  Ecoute le champ email du formulaire.
 */
email.addEventListener("change", function () {
    emailValide = valider("^[a-zA-Z0-9.-_]+@[a-zA-Z0-9-]{2,}[.][a-z]{2,3}$", email.value, "emailErrorMsg", "l'email n'est pas valide !")
    contact.email = email.value;
});
let commander = document.querySelector("#order");
/** ecoute le bouton commander pour envoyer les données.
 */
commander.addEventListener("click", async function (e) {
    e.preventDefault();
    /**  Si tous les champs sont valide les données sont envoyé.
    */
    if (prenomValide && nomValide && adresseValide && villeValide && emailValide) {
        infoLocalId();
        let rep = await fetch(`http://localhost:3000/api/products/order`, {
            method: "POST",
            body: JSON.stringify(panierInfoClient),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let commande = await rep.json();
        console.log(commande);
        location.href = `confirmation.html?id=${commande.orderId}`
        /**  Si un des champs n'est pas validé l'utilisateur reçoit une alerte.
        */
    } else {
        alert("les champs ne sont pas remplis !")
    }
})