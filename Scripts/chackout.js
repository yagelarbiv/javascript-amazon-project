import {cart, removeFromCart, calculateCartQuantity, updateQuantity} from '../data/cart.js';
import {products} from "../data/products.js";
import {formatcurrency} from "./Utils/money.js";

let component = '';
cart.forEach((cartItem) => {
  const productid = cartItem.id; 
  let matchingproducts;
  products.forEach(product => {
    if (productid === product.id) {
      matchingproducts = product;
    }
  })

  component += `<div class="cart-item-container js-cart-item-container-${matchingproducts.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingproducts.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingproducts.name}
      </div>
      <div class="product-price">
        ${formatcurrency(matchingproducts.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
        Quantity: <span class="quantity-label js-quantity-label-${matchingproducts.id}">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary js-update-link" data-produts-id="${matchingproducts.id}">
          Update
        </span>
        <input type="number" min="0" max="1000" class="quantity-input js-quantity-input-${matchingproducts.id}">
        <span class="save-quantity-link link-primary js-save-link"
        data-product-id="${matchingproducts.id}">
        Save
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" data-produts-id="${matchingproducts.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingproducts.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingproducts.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingproducts.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
});
document.querySelector(".order-summary").innerHTML = component;
updateCartQuantity();

document.querySelectorAll(".js-delete-link")
.forEach((link) => {
  link.addEventListener("click", () =>{
    const productid = link.dataset.produtsId;
    removeFromCart(productid);
    document.querySelector(`.js-cart-item-container-${productid}`).remove();
    updateCartQuantity();
  })
});
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
  document.querySelector('.payment-summary-items').innerHTML = `items (${cartQuantity})`;
}

updateCartQuantity();

document.querySelectorAll(".js-update-link")
.forEach((link) => {
  link.addEventListener("click", () =>{
    const productid = link.dataset.produtsId;

    const container = document.querySelector(
      `.js-cart-item-container-${productid}`
    );
    container.classList.add('is-editing-quantity');
  })
})
document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      
      updateQuantity(productId, newQuantity);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;
      updateCartQuantity();
    });
  });