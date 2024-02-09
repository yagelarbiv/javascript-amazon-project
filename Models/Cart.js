import { products } from "../data/products";

export class Cart extends products {

  static CartInstance = [];
  static CartQuantity = 0;

  constructor(id, quantity, DeliveryOptionsId, image, name, Stars, count , priceCents, keywords) 
  {
    super(id, image, name, Stars, count, priceCents, keywords);
    this.quantity = quantity;
    this.DeliveryOptionsId = DeliveryOptionsId;
    this.addToCart();
    Cart.CartQuantity += quantity;
  }

  addToCart() {
    let matchingitem;
    if(!Cart.CartQuantity) {
      Cart.CartQuantity.push({
        id: this.id,
        quantity: this.quantity,
        DeliveryOptionsId: this.DeliveryOptionsId
      });
    }
    else{
      Cart.CartQuantity((product) => {
        if (this.id === product.id) {
          matchingitem = product;
        }
      });
      if (matchingitem) {
        Cart.CartQuantity += this.quantity;
      } else {
        Cart.CartQuantity.push({
          id: this.id,
          quantity: this.quantity,
          DeliveryOptionsId: this.DeliveryOptionsId
        });
        const checkmarkElement = document.querySelector(`.js-added-to-cart-${this.id}`);
        if (checkmarkElement) {
          checkmarkElement.style.opacity = 1;
  
          const intervalId = setInterval(() => {
            let opacity = parseFloat(checkmarkElement.style.opacity);
            
            if (opacity === 0) {
              opacity = 1;
            } else {
              opacity = 0;
              clearInterval(intervalId);
            }
  
            checkmarkElement.style.opacity = opacity;
          }, 1500);
        } 
      }
    }
    saveToStorage();
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(Cart.CartInstance));
}

export function GetProductItem(productid) {
  let matchingproducts;
  Cart.CartInstance.forEach(cartItem => {
    if (productid === cartItem.id) {
      matchingproducts = cartItem;
    }
  })
  return matchingproducts
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingitem;
  Cart.CartInstance.forEach(product => {
    if (productId === product.id) {
      matchingitem = product;
    }
  });
  matchingitem.DeliveryOptionsId = deliveryOptionId;
  saveToStorage();
}

export function removeFromCart(productid) {
  const newcart = [];
  Cart.CartInstance.forEach((cartItem, index) => {
    if (cartItem.id === productid) {
      Cart.CartInstance.splice(index, 1);
    }
  });
  saveToStorage();
}

