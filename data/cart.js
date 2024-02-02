export const cart = [];
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
}

export function addToCart(Product) {
  let matchingitem;
  cart.forEach(product => {
    if (Product.id === product.id) {
      matchingitem = product;
    }
  });
  if (matchingitem) {
    matchingitem.quantity += 1;
  } else {
    cart.push(Product);
  }
}