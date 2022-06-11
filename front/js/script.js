fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();  
    }   else {
            console.log("Erreur réseau");
    }})
    .catch (function(e) {
        console.log("Il y a un problème avec " + e);
    })
    // création et insertion des éléments HTML !!
const section = document.getElementById("items");
const lien = document.createElement("a");
lien.href = "./product.html?id=42";
section.appendChild(lien);

const article = document.createElement("article");
lien.appendChild(article);

const image = document.createElement("img");
image.src = "";
image.alt = "Lorem ipsum dolor sit amet, Kanap name1";
article.appendChild(image);

const titre = document.createElement("h3");
titre.className = "productName";
const texte_titre = document.createTextNode("Kanap name1");
titre.appendChild(texte_titre);
article.appendChild(titre);

const paragraphe = document.createElement("p");
paragraphe.className = "productDescription";
const texte_paragraphe = document.createTextNode("Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.");
paragraphe.appendChild(texte_paragraphe);
article.appendChild(paragraphe);