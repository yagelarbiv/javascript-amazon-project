import {Track} from "../data/track.js";
import {GetProductItem} from '../data/cart.js'
import { GetProduct } from "../data/products.js";
import {getDeliveryOptions} from "../../data/DeliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

document.addEventListener('DOMContentLoaded',() => {
  let component = rendertrackingpage(Track);
  document.querySelector('.tracking-order-details').innerHTML = component
})

export function rendertrackingpage(Track) {
  const product = GetProduct(Track.id);
  const MatchingItem =  GetProductItem(product.id);
  
  const DeliveryOptionsId = MatchingItem.DeliveryOptionsId;
  const deliveryOption = getDeliveryOptions(DeliveryOptionsId); 

  const today = dayjs();
  const deliverydate = today.add(deliveryOption.DeliveryDays, 'days'); 
  const datestring = deliverydate.format("dddd, MMMM D");

  let component = `
      <div class="delivery-date">
        Arriving on ${datestring}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${MatchingItem.quantity}
      </div>

      <img class="product-image" src="${product.image}">
  `;
  return component;
}
