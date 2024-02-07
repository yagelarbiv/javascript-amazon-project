import {cart} from '../../data/cart.js'
import {GetProduct} from "../../data/products.js";
import {getDeliveryOptions} from "../../data/DeliveryOptions.js";
import {formatcurrency} from "../Utils/money.js";
import { addToOrder } from '../../data/OrdersModel.js';
import {renderOrderCheckout} from '../Orders.js';
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
let id = 1;
export function renderpaymentsummery() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach(cartItem => {
    const product = GetProduct(cartItem.id);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOptions(cartItem.DeliveryOptionsId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTax = shippingPriceCents + productPriceCents
  const taxcents = totalBeforeTax * 0.1
  const totalcents = totalBeforeTax + taxcents

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  const paymentSummeryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div class="payment-summary-items">Items (${cartQuantity}):</div>
        <div class="payment-summary-money">
          ${formatcurrency(totalBeforeTax)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
          ${formatcurrency(shippingPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
          ${formatcurrency(totalBeforeTax)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          ${formatcurrency(taxcents)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          ${formatcurrency(totalcents)}
        </div>
      </div>
      
      <button class="place-order-button button-primary">
        Place your order
      </button>
  `;
  const Items = []
  cart.forEach((cart) => {
    Items.push({
      ItemId: cart.id,
      DeliveryOptionsId: cart.DeliveryOptionsId
    })
  });
  document.querySelector('.js-payment-summary').innerHTML = paymentSummeryHTML
  document.querySelector('.place-order-button').addEventListener('click', () => {
    const today = dayjs();
    addToOrder({
        OrderId: id++,
        OrderDate: today.format("dddd, MMMM D"),
        OrderTotalCents: totalcents,
        OrderItemsId: Items
    });
    renderOrderCheckout();
    window.location.href = 'http://127.0.0.1:5500/Orders.html';
  })
}