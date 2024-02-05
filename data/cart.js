export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        DeliveryOptionsId: '1'
    },{
        quantity: 1,
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 2,
        DeliveryOptionsId: '2'
      }
    ];
}
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem = {};
  cart.forEach(cartItem => {
    if (productId === cartItem.id) {
      cartItem.quantity = newQuantity;
    }
  });
  matchingItem.quantity = newQuantity;
  
  saveToStorage();
}
  
export function addToCart(Product, quantity) {
  let matchingitem;
  cart.forEach(product => {
    if (Product.id === product.id) {
      matchingitem = product;
    }
  });
  if (matchingitem) {
    if(quantity > 1) {
      matchingitem.quantity += quantity;
    }
    else{
      matchingitem.quantity += 1;
    }
  } else {
    cart.push({
      productId: matchingitem.id,
      quantity: 1,
      DeliveryOptionsId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productid) {
  const newcart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productid) {
      newcart.push(cartItem);
    }
  });

  cart = newcart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingitem;
  cart.forEach(product => {
    if (productId === product.id) {
      matchingitem = product;
    }
  });
  matchingitem.DeliveryOptionsId = deliveryOptionId;
  saveToStorage();
}