const articles = function(infos) {
    
    const section = document.getElementById("items");
    
    for (let i = 0;i < infos.length; i++ ){
    let info = infos[i];

    const lien = document.createElement("a");
    lien.href = "./product.html?id=42";
    section.appendChild(lien);
    const article = document.createElement("article");
    lien.appendChild(article);
    const image = document.createElement("img");
    image.src = info.imageUrl;
    image.alt = info.altTxt;
    article.appendChild(image);
    const titre = document.createElement("h3");
    titre.className = "productName";
    let texte_titre = document.createTextNode(info.name);
    titre.appendChild(texte_titre);
    article.appendChild(titre);
    const paragraphe = document.createElement("p");
    paragraphe.className = "productDescription";
    let texte_paragraphe = document.createTextNode(info.description);
    paragraphe.appendChild(texte_paragraphe);
    article.appendChild(paragraphe);
}}

fetch("http://localhost:3000/api/products")
    .then(reponse => reponse.json())
    .then(data => {
        console.table(data);
        articles(data);
    })
    .catch (e => console.log("Il y a un problème avec " + e));
