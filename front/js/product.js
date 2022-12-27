//---------JE REDIRIGE L'URL DE L'API---------

// je crée une nouvelle url à partir de l'url actuelle
// et en ajoutant searchParams pour manipuler les paramètres de requête d'URL :

let url = new URL(window.location.href);
// j'indique que la nouvelle url sera ajoutée d'un id :
let productId = url.searchParams.get("id");

//---------J'APPELLE DE NOUVEAU L'API AVEC L'ID DU CANAPE CHOISI---------

// je crée les variables dont j'ai besoin pour manipuler cette page :
const image = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
let imageUrl = "";
let altTxt = "";

// je crée la bonne URL pour chaque produit choisi en ajoutant productId
fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        // je modifie le contenu de chaque variable avec les bonnes données :
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        imageUrl = data.imageUrl;
        altTxt = data.altTxt;
        title.innerHTML = `<h1>${data.name}</h1>`;
        price.innerText = `${data.price}`;
        description.innerText = `${data.description}`;

        // je configure le choix des couleurs
        for (number in data.colors) {
          colors.options[colors.options.length] = new Option(
            data.colors[number],
            data.colors[number]
          );
        }
      });
    }
  })
  // j'ajoute un message au cas où le serveur ne répond pas
  .catch((_error) => {
    alert("Le serveur ne répond pas.");
  });

//---------JE RECUPERE LES DONNEES PAR RAPPORT AU CHOIX DE L'UTILISATEUR---------

const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

// je configure un eventListener quand l'utilisateur clique sur ajouter au panier
addToCart.addEventListener("click", () => {
  let choice = {
    id: productId,
    image: imageUrl,
    alt: altTxt,
    title: title.textContent,
    color: colors.value,
    price: price.textContent,
    quantity: quantity.value,
  };

  // je déclare une variable productInLocalStorage
  // dans laquelle je mets les clés+valeurs dans le local storage
  // JSON.parse permet de convertir les données au format JSON en objet JavaScript
  let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

  // j'ajoute les produits sélectionnés dans le localStorage
  const addProductLocalStorage = () => {
    // je récupère la sélection de l'utilisateur dans le tableau de l'objet :
    // on peut voir dans la console qu'il y a les données,
    // mais pas encore stockées dans le storage à ce stade
    productInLocalStorage.push(choice);
    // je stocke les données récupérées dans le localStorage :
    // JSON.stringify permet de convertir les données au format JavaScript en JSON
    // vérifier que key et value dans l'inspecteur contiennent bien des données
    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  };

  let update = false;

  // s'il y a des produits enregistrés dans le localStorage
  if (productInLocalStorage) {
    // verifier que le produit ne soit pas deja dans le localstorage/panier
    // avec la couleur
    productInLocalStorage.forEach(function (productOk, key) {
      if (productOk.id == productId && productOk.color == colors.value) {
        productInLocalStorage[key].quantity =
          parseInt(productOk.quantity) + parseInt(quantity.value);
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        update = true;
      }
    });

    if (!update) {
      addProductLocalStorage();
    }
  }
  // s'il n'y a aucun produit enregistré dans le localStorage
  else {
    // je crée alors un tableau avec les éléments choisi par l'utilisateur
    productInLocalStorage = [];
    addProductLocalStorage();
  }
});
