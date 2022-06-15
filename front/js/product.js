
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
            const option = document.getElementById("colors");
            const couleurs = document.createElement("option");
            couleurs.value = teinte;
            couleurs.textContent = teinte;
            option.appendChild(couleurs);
}}

// récupération d'un tableau contenant les informations sur le serveur et utilise la fonction du dessus.
const idUrl = new URL(location.href).searchParams.get("id");
fetch(`http://localhost:3000/api/products/${idUrl}`)
    .then(reponse => reponse.json())
    .then(data => produit(data))
    .catch (e => console.log("Il y a un problème avec " + e));
   