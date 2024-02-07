import {Orders} from "../data/OrdersModel.js";
import {formatcurrency} from "./Utils/money.js";
import {GetProductItem,calculateCartQuantity} from '../data/cart.js'
import {getDeliveryOptions} from "../../data/DeliveryOptions.js";
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
    const orderGrid = document.getElementsByClassName('orders-grid')
    orderGrid.innerHTML = orderCheckout;
    document.getElementsByClassName("cart-quantity").innerHTML = calculateCartQuantity();
}



function renderOrderCheckoutItem(Item) {
  let orderCheckout = '';
  const MatchingItem = GetProductItem(Item.ItemId);

  const DeliveryOptionsId = MatchingItem.DeliveryOptionsId;
  const deliveryOptions = getDeliveryOptions(DeliveryOptionsId);

  const today = dayjs();
  const deliverydate = today.add(deliveryOptions.delivaryDays, 'days');
  const datestring = deliverydate.format("dddd, MMMM D");

  orderCheckout = `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${MatchingItem.image}">
          </div>
          
          <div class="product-details">
            <div class="product-name">
              ${MatchingItem.name}
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
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
        `;
  return orderCheckout;
}
