//------API--------

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((api) => {
    allProducts(api);
  })

  //-------Message d'erreur---------

  .catch((_error) => {
    alert("Le serveur ne répond pas.");
  });

//-------------Produits------------

let allProducts = (api) => {
  for (products of api) {
    const items = document.getElementById("items");

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

console.log(allProducts);
