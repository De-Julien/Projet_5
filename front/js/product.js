const idProduit = new URL(location.href).searchParams.get("id");
const bouton = document.querySelector("#addToCart");
// fonction pour créer les balises en fonction du nombre d'éléments dans le tableau.
const produit = function(info) {

        const article = document.querySelector(".item__img");
        const image = document.createElement("img");
        image.src = info.imageUrl;
        image.alt = info.altTxt;
        article.appendChild(image);
        const titre = document.getElementById("title");
        titre.textContent = info.name;
        const prix = document.getElementById("price");
        prix.textContent = info.price;
        const description = document.getElementById("description");
        description.textContent = info.description;
          for (let i = 0; i < info.colors.length; i++){
            let teinte = info.colors[i];
            const options = document.getElementById("colors");
            const couleurs = document.createElement("option");
            couleurs.value = teinte;
            couleurs.textContent = teinte;
            options.appendChild(couleurs);
}}

// bouton qui créer un tableau sur le localstorage pour y mettre les produit.
bouton.onclick = () => {
  let produit = JSON.parse(localStorage.getItem("produits"))
  let kanap = {
    id: idProduit,
    teinte: colors.value,
    nombre: quantity.value
}
// si la quantité ou la couleur n'est pas défini on prévient l'utilisateur.
if(kanap.teinte == '' || kanap.nombre == "0"){
  alert("il faut choisir une couleur et une quantité.");
}/*
else if(kanap.id && kanap.teinte == produit.id && produit.teinte){
  produit.nombre = kanap.nombre + produit.nombre;
  console.log(produit);
  localStorage.setItem("produits",JSON.stringify(produit));
}
*/
// si le tableau n'est pas vide on récupère l'ancien tableau et on ajoute les produits.
else if(produit){
    produit.push(kanap);
    console.log(produit);
    localStorage.setItem("produits",JSON.stringify(produit));
}
// il n'y a pas de tableau on le créer pour mettre les infos dedans.
else {
    const panier = [];
    panier.push(kanap);
    localStorage.setItem("produits",JSON.stringify(panier));
}}

// récupération d'un tableau contenant les informations sur le serveur.
fetch(`http://localhost:3000/api/products/${idProduit}`)
    .then(reponse => reponse.json())
    .then(data => produit(data))
    .catch (e => console.log("Il y a un problème avec " + e));
   