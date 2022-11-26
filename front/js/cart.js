const cartItems = document.getElementById("cart__items");

let cartLocal = JSON.parse(localStorage.getItem("Cart"));

/* for( let i = 0; i < localStorage.length; i++){
  localStorage.key(i);
*/

if (cartLocal === null || cartLocal == 0) {
  cartItems.innerHTML = `<p>Votre panier est vide</p>`;
}
