import {cart, removeFromCart, 
  calculateCartQuantity, 
  updateQuantity, 
  updateDeliveryOption} from '../../data/cart.js';
import {products} from "../../data/products.js";
import {formatcurrency} from "../Utils/money.js";
import {DeliveryOptions} from "../../data/DeliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
    let component = '';
    cart.forEach((cartItem) => {
    const productid = cartItem.id; 
    let matchingproducts;
    products.forEach(product => {
      if (productid === product.id) {
        matchingproducts = product;
      }
    })

    const DeliveryOptionsId = cartItem.DeliveryOptionsId
    let deliveryOptions;
    DeliveryOptions.forEach(delivery => {
      if(delivery.Id === DeliveryOptionsId) {
        deliveryOptions = delivery
      }
    });
    const today = dayjs();
    const deliverydate = today.add(deliveryOptions.DeliveryDays, 'days');
    const datestring = deliverydate.format("dddd, MMMM D")


    component += `<div class="cart-item-container js-cart-item-container-${matchingproducts.id}">
    <div class="delivery-date">
      Delivery date: ${datestring}
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
        ${deliveryOptionHTML(matchingproducts, cartItem)}
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
    
    document.querySelectorAll('.js-delivery-options').forEach((element) =>{
      element.addEventListener('click',() => {
        updateDeliveryOption(element.dataset.productId, element.dataset.deliveryOptionsId);
        renderOrderSummary();
      })
    })
  }
  
  function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home-link')
  .innerHTML = `${cartQuantity} items`;
  document.querySelector('.payment-summary-items').innerHTML = `items (${cartQuantity})`;
}

function deliveryOptionHTML(matchingproducts, cartItem) {
  let Html = '';
  
  DeliveryOptions.forEach((deliveryOptions) => {
    const today = dayjs();
    const deliverydate = today.add(deliveryOptions.DeliveryDays, 'days');
    const datestring = deliverydate.format("dddd, MMMM D")
    const pricestring = deliveryOptions.priceCents === 0 ? 'free' : formatcurrency(deliveryOptions.priceCents)
    const isChecked = deliveryOptions.Id === cartItem.DeliveryOptionsId
    Html += `
    <div class="delivery-option js-delivery-options"
    data-product-id="${matchingproducts.id}"
    data-delivery-options-id="${deliveryOptions.Id}">
    <input type="radio" ${isChecked ? 'checked' : ''}
    class="delivery-option-input"
    name="delivery-option-${matchingproducts.id}">
    <div>
    <div class="delivery-option-date">
    ${datestring}
    </div>
    <div class="delivery-option-price">
    ${pricestring} - Shipping
    </div>
    </div>
    </div>
    `
  });
  
  return Html;
}
