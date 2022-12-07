let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

if (productInLocalStorage === null || productInLocalStorage == 0) {
  document.querySelector("#cart__items").innerHTML = `
  <div class="cart__empty">
    <p>Votre panier est vide ! <br> Merci de sélectionner des produits depuis la page d'accueil</p>
  </div>`;
} else {
  let itemCards = [];

  for (i = 0; i < productInLocalStorage.length; i++) {
    products.push(productInLocalStorage[i].id);

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

  let changeQtt = () => {
    let itemQtt = document.querySelectorAll(".itemQuantity");
    for (let j = 0; j < itemQtt.length; j++) {
      itemQtt[j].addEventListener("change", (e) => {
        e.preventDefault();

        let itemNewQtt = itemQtt[j].value;
        const newLocalStorage = {
          id: productInLocalStorage[j].id,
          image: productInLocalStorage[j].image,
          alt: productInLocalStorage[j].alt,
          title: productInLocalStorage[j].title,
          color: productInLocalStorage[j].color,
          price: productInLocalStorage[j].price,
          quantity: itemNewQtt,
        };

        productInLocalStorage[j] = newLocalStorage;
        localStorage.setItem("product", JSON.stringify(productInLocalStorage));

        alert("Votre panier est à jour.");
        totalArticles();
        priceAmount();
      });
    }
  };
  changeQtt();

  let deleteArticle = () => {
    const deleteItem = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < deleteItem.length; k++) {
      deleteItem[k].addEventListener("click", (e) => {
        e.preventDefault();

        let deleteId = productInLocalStorage[k].id;
        let deleteColor = productInLocalStorage[k].color;

        productInLocalStorage = productInLocalStorage.filter(
          (elt) => elt.id !== deleteId || elt.color !== deleteColor
        );

        localStorage.setItem("product", JSON.stringify(productInLocalStorage));

        alert("Votre article a bien été supprimé.");
        window.location.href = "cart.html";
      });
    }
  };
  deleteArticle();

  let totalArticles = () => {
    let totalItems = 0;
    for (l in productInLocalStorage) {
      const newQuantity = parseInt(productInLocalStorage[l].quantity);

      totalItems += newQuantity;
    }

    const totalQuantity = document.getElementById("totalQuantity");
    totalQuantity.textContent = totalItems;
  };
  totalArticles();

  let priceAmount = () => {
    const calculPrice = [];
    for (m = 0; m < productInLocalStorage.length; m++) {
      const cartAmount =
        productInLocalStorage[m].price * productInLocalStorage[m].quantity;
      calculPrice.push(cartAmount);

      const reduce = (previousValue, currentValue) =>
        previousValue + currentValue;
      total = calculPrice.reduce(reduce);
    }
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = total;
  };
  priceAmount();
}

let postForm = () => {
  const order = document.getElementById("order");
  order.addEventListener("click", () => {
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    let controlFirstName = () => {
      const validFirstName = contact.firstName;
      if (
        /^[^0-9_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]{3,20}$/.test(validFirstName)
      ) {
        return true;
      } else {
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText =
          "Merci de vérifier le prénom, 3 caractères minimum";
      }
    };
    controlFirstName();
  });
};
