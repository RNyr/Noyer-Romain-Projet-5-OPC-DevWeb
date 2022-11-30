const cartItems = document.getElementById("cart__items");
let cartLocal = [];

cartLocal = JSON.parse(localStorage.getItem("product"));

/* for( let i = 0; i < localStorage.length; i++){
  localStorage.key(i)};
*/

if (cartLocal === null || cartLocal == 0) {
  cartItems.innerHTML = `<p>Votre panier est vide</p>`;
} else {
  cartItems.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="${cartLocal.imageUrl}" alt="${cartLocal.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${cartLocal.title}</h2>
      <p>${cartLocal.color}</p>
      <p>${cartLocal.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${cartLocal.quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartLocal.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
</article>`;
}
