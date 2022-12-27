//---------JE FAIS APPEL A L'API QUI CONTIENT LES PRODUITS---------

//je demande à fetch de récupérer les données depuis l'url de l'API :
fetch("http://localhost:3000/api/products")
  // première promesse .then qui va récupérer la réponse
  // en la transformant en json pour faciliter l'interprétation par le navigateur :
  .then((res) => res.json())
  // deuxième promesse .then qui va afficher
  // les données contenues dans ma fonction allProducts :
  .then((api) => {
    allProducts(api);
  })

  //-------Message d'erreur---------

  .catch((_error) => {
    alert("Le serveur ne répond pas.");
  });

//-------------Produits------------

let allProducts = (api) => {
  // pour ma variable product de ma promise .then api
  for (products of api) {
    // trouver l'élément #items dans index.html...
    const items = document.getElementById("items");
    // ... et le modifier avec le contenu entre ``
    // le + sert à ajouter tous les éléments tant qu'il y en a
    items.innerHTML += `
        <a href="./product.html?id=${products._id}">
          <article>
           <img src="${products.imageUrl}" alt="${products.altTxt}">
           <h3 class="productName">${products.name}</h3>
           <p class="productDescription">${products.description}</p>
           </article>
        </a>
      `;
  }
};
