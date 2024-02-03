export let cart = [{
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 1,
},{
quantity: 1,
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 2,
},
];
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".cart-quantity").innerHTML = cartQuantity;
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
}

export function removeFromCart(productid) {
  const newcart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== productid) {
      newcart.push(cartItem);
    }
  });

  cart = newcart;
}