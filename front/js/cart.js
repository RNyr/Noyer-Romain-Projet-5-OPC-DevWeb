// RECUPERER LES PRODUITS STOCKES DANS LE LOCALSTORAGE   //
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

// AFFICHER LES PRODUITS DU PANIER

// si le panier est vide : afficher 'le panier est vide'
if (productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML = `
  <div class="cart__empty">
    <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
  </div>`;
} else {
  // si le panier n'est pas vide : afficher les produits dans le localStorage
  let itemCards = [];
  // expression initiale; condition; incrémentation
  for (i = 0; i < productInLocalStorage.length; i++) {
    products.push(productInLocalStorage[i].id);

    // le code suivant sera injecté à chaque tour de boucle
    // selon la longueur des produits dans le local storage
    itemCards =
      itemCards +
      `
    
    <article class="cart__item" data-id="${productInLocalStorage[i].id}" data-color="${productInLocalStorage.color}">
    <div class="cart__item__img">
      <img src="${productInLocalStorage[i].image}" alt="${productInLocalStorage[i].alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${productInLocalStorage[i].title}</h2>
        <p>${productInLocalStorage[i].color}</p>
        <p>${productInLocalStorage[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInLocalStorage[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
  }
  if (i === productInLocalStorage.length) {
    const itemCart = document.getElementById("cart__items");
    itemCart.innerHTML += itemCards;
  }

  // je modifie la quantité dans le panier
  let changeQtt = () => {
    let itemQtt = document.querySelectorAll(".itemQuantity");
    for (let j = 0; j < itemQtt.length; j++) {
      itemQtt[j].addEventListener("change", (e) => {
        e.preventDefault();

        // sélection de la nouvelle quantité...
        // ... qu'on va sauvegarder dans un nouveau tableau
        // avec les autres éléments du localStorage

        let itemNewQtt = itemQtt[j].value;
        const newLocalStorage = {
          id: productInLocalStorage[j].id,
          image: productInLocalStorage[j].image,
          alt: productInLocalStorage[j].alt,
          title: productInLocalStorage[j].title,
          color: productInLocalStorage[j].color,
          price: productInLocalStorage[j].price,
          quantity: itemNewQtt, // avec la nouvelle quantité souhaitée
        };

        // actualiser le localStorage avec les nouvelles données récupérées...
        productInLocalStorage[j] = newLocalStorage;
        // ...en transformant les Js en Json
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));
        // avertir de la modification et mettre à jour les totaux
        alert("Votre panier est à jour.");
        totalArticles();
        priceAmount();
      });
    }
  };
  changeQtt();

  // je supprime un produit dans le panier
  let deleteArticle = () => {
    const deleteItem = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < deleteItem.length; k++) {
      deleteItem[k].addEventListener("click", (e) => {
        e.preventDefault();

        // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
        let deleteId = productInLocalStorage[k].id;
        let deleteColor = productInLocalStorage[k].color;

        // filtrer l'élément cliqué par le bouton supprimer
        // en respectant les conditions du callback
        productInLocalStorage = productInLocalStorage.filter(
          (elt) => elt.id !== deleteId || elt.color !== deleteColor
        );

        // envoyer les nouvelles données dans le localStorage
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));

        // avertir de la suppression et recharger la page
        alert("Votre article a bien été supprimé.");
        window.location.href = "cart.html";
      });
    }
  };
  deleteArticle();

  // j'affiche le total des articles dans le panier
  let totalArticles = () => {
    let totalItems = 0;
    for (l in productInLocalStorage) {
      // analyser et convertir la valeur 'quantité' dans le localstorage en une chaîne
      // et renvoie un entier (parseInteger), sur la base décimale de 10
      const newQuantity = parseInt(productInLocalStorage[l].quantity);

      // attribuer la valeur retournée par parseInt à la variable totalItems
      totalItems += newQuantity;
    }
    // attribuer à #totalQuantité la valeur de totalItems et l'afficher dans le DOM
    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = totalItems;
  };
  totalArticles();

  // je calcule le montant total du panier
  let priceAmount = () => {
    const calculPrice = [];
    for (m = 0; m < productInLocalStorage.length; m++) {
      // prix de l'article quantité * prix
      const cartAmount =
        productInLocalStorage[m].price * productInLocalStorage[m].quantity;
      calculPrice.push(cartAmount);

      // la fonction reduce() permet de garder en mémoire les résultats de l'opération
      // elle fonctionne comme une boucle, avec un accumulateur et la valeur courante
      const reduce = (previousValue, currentValue) =>
        previousValue + currentValue;
      total = calculPrice.reduce(reduce);
    }
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = total;
  };
  priceAmount();
}

/***********************************/
//DEMANDER LES INFOS DE L'UTILISATEUR//
/**********************************/

const adressRegExp = new RegExp("^[A-zÀ-ú0-9 ,.'-]+$");
const nameRegExp = new RegExp("^[A-zÀ-ú -]+$");
const emailRegExp = new RegExp(
  "^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$"
);

// j'envoie le formulaire dans le serveur
let postForm = () => {
  const order = document.getElementById("order");
  order.addEventListener("click", () => {
    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    ////
    // --- vérifier la validation des entrées --- //
    ////

    //contrôle prénom
    let controlFirstName = () => {
      const validFirstName = contact.firstName;
      if (nameRegExp.test(validFirstName)) {
        return true;
      } else {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText =
          "Merci de vérifier le prénom, 3 caractères minimum";
      }
    };
    // contrôle nom
    let controlName = () => {
      const validName = contact.lastName;
      if (nameRegExp.test(validName)) {
        return true;
      } else {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText =
          "Merci de vérifier le nom, 3 caractères minimum, avec des lettres uniquement";
      }
    };
    // contrôle adresse
    let controlAddress = () => {
      const validAddress = contact.address;
      if (adressRegExp.test(validAddress)) {
        return true;
      } else {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText =
          "Merci de vérifier l'adresse, alphanumérique et sans caractères spéciaux";
      }
    };
    // contrôle ville
    let controlCity = () => {
      const validAddress = contact.city;
      if (nameRegExp.test(validAddress)) {
        return true;
      } else {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText =
          "Merci de vérifier le nom de la ville, 3 caractères minimum, avec des lettres uniquement";
      }
    };
    // contrôle email
    let controlEmail = () => {
      const validEmail = contact.email;
      if (emailRegExp.test(validEmail)) {
        return true;
      } else {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = "Erreur ! Email non valide";
      }
    };

    ////
    // --- FIN vérifier la validation des entrées --- //
    ////

    // Après vérification des entrées, j'envoie l'objet contact dans le localStorage
    let validControl = () => {
      if (
        controlFirstName() &&
        controlName() &&
        controlAddress() &&
        controlCity() &&
        controlEmail()
      ) {
        localStorage.setItem("contact", JSON.stringify(contact));
        return true;
      } else {
        alert("Merci de revérifier les données du formulaire");
      }
    };
    validControl();

    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...

    const sendFormData = {
      contact,
      products,
    };

    // j'envoie le formulaire + localStorage (sendFormData)
    // ... que j'envoie au serveur
    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        if (validControl()) {
          document.location.href = "confirmation.html?id=" + data.orderId;
        }
      });
  }); // fin eventListener postForm
}; // fin envoi du formulaire postForm
postForm();
