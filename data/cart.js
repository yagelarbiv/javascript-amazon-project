export let cart = JSON.parse(localStorage.getItem('cart'));

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
    cart.push(Product);
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