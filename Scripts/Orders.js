import {Orders} from "../data/OrdersModel.js";
import {formatcurrency} from "./Utils/money.js";
import {GetProductItem} from '../data/cart.js'
import { GetProduct, GetProductbyImage } from "../data/products.js";
import {getDeliveryOptions} from "../../data/DeliveryOptions.js";
import {addTotrack} from '../data/track.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderOrderCheckout() {
  let orderCheckout = '';
  Orders.forEach((order) => {
    orderCheckout = `
      <section class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.OrderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>${formatcurrency(order.OrderTotalCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.OrderId}</div>
          </div>
        </div>
      `;
      order.OrderItemsId.forEach((Item) => {
      orderCheckout += renderOrderCheckoutItem(Item);
      })
    })
    orderCheckout += `</section>`
    return orderCheckout;
}

document.addEventListener('DOMContentLoaded',() =>{
  const orderGrid = document.querySelector('.grid');
  orderGrid.innerHTML = renderOrderCheckout();

  document.querySelectorAll('.track-package-button').forEach((button) => {
    button.addEventListener("click", (event) => {
      localStorage.removeItem('Track');
      const itemtrack = GetProductbyImage(button.dataset.productImage);
      let trackItem = {
        id: itemtrack.id,
        image: itemtrack.image,
      }
      addTotrack(trackItem);
      window.location.href = './tracking.html';
    })
  })
})

function renderOrderCheckoutItem(Item) {
  const MatchingItem = GetProductItem(Item.ItemId);
  const product = GetProduct(MatchingItem.id);
  
  const DeliveryOptionsId = MatchingItem.DeliveryOptionsId;
  const deliveryOption = getDeliveryOptions(DeliveryOptionsId); 

  const today = dayjs();
  const deliverydate = today.add(deliveryOption.DeliveryDays, 'days'); 
  const datestring = deliverydate.format("dddd, MMMM D");

  let orderCheckout = '';
  orderCheckout = `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${product.image}">
          </div>
          
          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${datestring}
            </div>
            <div class="product-quantity">
              Quantity: ${MatchingItem.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="../images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>
          
          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary
              data-product-id="${product.id}"
              data-product-image="${product.image}"
              >
                Track package
              </button>
            </a>
          </div>
        </div>
        `;
  return orderCheckout;
}
