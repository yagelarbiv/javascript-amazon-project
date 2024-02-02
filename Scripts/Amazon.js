let component = '';
products.forEach(product => {
  component += ` 
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
    ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
      ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart-${product.id}">
      <img src="../images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}"
    data-product-image="${product.image}"
    data-product-price="${product.priceCents}"
    data-product-name="${product.name}">
      Add to Cart
    </button>
  </div>`
})
document.querySelector(".products-grid").innerHTML = component;

document.querySelectorAll(".js-add-to-cart")
.forEach((button) => {
  button.addEventListener("click", (event) => {
    const quantity = Number(document.querySelector(`.js-quantity-selector-${button.dataset.productId}`).value);
    const Product = {
      id: button.dataset.productId,
      image: button.dataset.productImage,
      priceCents: button.dataset.productPrice,
      name: button.dataset.productName,
      quantity: quantity
    };
    let matchingitem;
    cart.forEach(product =>{
      if(Product.id === product.id) {
        matchingitem = product
      }
    });
    if(matchingitem) {
      matchingitem.quantity += 1;
    } else {
      cart.push(Product);
    }
    var cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
      console.log(cartQuantity);
    })
    document.querySelector(".cart-quantity").innerHTML = cartQuantity;

  })
});