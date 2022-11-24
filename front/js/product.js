let url = new URL(window.location.href);
let productId = url.searchParams.get("id");

const image = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

fetch("http://localhost:3000/api/products/" + productId)
  .then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
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
    color: colors.value,
    quantity: quantity.value,
  };
  let saveChoice = JSON.stringify(choice);
  localStorage.setItem("Cart", saveChoice);
});
