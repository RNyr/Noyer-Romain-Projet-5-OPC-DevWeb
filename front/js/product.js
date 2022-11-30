let url = new URL(window.location.href);
let productId = url.searchParams.get("id");

const image = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
let imageUrl = "";
let altTxt = "";

fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        imageUrl = data.imageUrl;
        altTxt = data.altTxt;
        title.innerHTML = `<h1>${data.name}</h1>`;
        price.innerText = `${data.price}`;
        description.innerText = `${data.description}`;

        for (number in data.colors) {
          colors.options[colors.options.length] = new Option(
            data.colors[number],
            data.colors[number]
          );
        }
      });
    }
  })

  .catch((_error) => {
    alert("Le serveur ne répond pas.");
  });

////-------------LocalStorage---------

const quantity = document.getElementById("quantity");
const addToCart = document.getElementById("addToCart");

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

  let productInLocalStorage = JSON.parse(localStorage.getItem("product"));

  const addProductLocalStorage = () => {
    productInLocalStorage.push(choice);

    localStorage.setItem("product", JSON.stringify(productInLocalStorage));
  };

  let update = false;

  if (productInLocalStorage) {
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
  } else {
    productInLocalStorage = [];
    addProductLocalStorage();
  }
});
