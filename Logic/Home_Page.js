// import { AddItemToCart } from '../Logic/Orders.js';
// import { Cart } from '../Logic/Orders.js';
var Items =  [
  {
    name: "athletic cotton socks 6 pairs",
    image: "../Images/Item-Image/athletic-cotton-socks-6-pairs.jpg",
    rating: "../Images/Rating-Images/rating-45.png",
    count:   87,
    price: "10.90$",
    CheckMark: "../Images/checkmark.png",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],
    size:[
  
    ],
  },
  {
    name: "intermediate composite basketball",
    image: "../Images/Item-Image/intermediate-composite-basketball.jpg",
    rating: "../Images/Rating-Images/rating-4.png",
    count:   127,
    price: "20.95$",
    CheckMark: "../Images/checkmark.png",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],
    size:[
  
    ],
  },
  {
    name: "knit athletic sneakers grays",
    image: "../Images/Item-Image/knit-athletic-sneakers-gray.jpg",
    rating: "../Images/Rating-Images/rating-4.png",
    count:   89,
    price: "$33.90",
    CheckMark: "../Images/checkmark.png",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],
    size:[
      5,
      6,
      7, 
      8,
      9
    ],
  },
  {
    name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
    image: "../Images/Item-Image/liquid-laundry-detergent-lavender.jpg",
    rating: "../Images/Rating-Images/rating-45.png",
    count:   305,
    price: "$28.99",
    CheckMark: "../Images/checkmark.png",
    color:[
  
    ],
    set:[
  
    ],
    style:[
      "Plain",
      "Lavender"
    ],
    size:[
  
    ],
  },
  {
    name: "Luxury Towel Set - Graphite Gray",
    image: "../Images/Item-Image/luxury-tower-set-4-piece.jpg",
    rating: "../Images/Rating-Images/rating-45.png",
    count:   144,
    price: "35.99$",
    CheckMark: "../Images/checkmark.png",
    color:[
  
    ],
    set:[
      "4-pieces",
      "6-pieces"
    ],
    style:[
  
    ],
    size:[
  
    ],
  },
  {
    name: "Plain Hooded Fleece Sweatshirt",
    image: "../Images/Item-Image/plain-hooded-fleece-sweatshirt-teal.jpg",
    rating: "../Images/Rating-Images/rating-45.png",
    count:   87,
    price: "10.90$",
    CheckMark: "../Images/checkmark.png",
    color:[
      "yellow",
      "teal"
    ],
    set:[
  
    ],
    style:[
  
    ],
    size:[
      "S",
      "M",
      "L"
    ],
  },
  {
    name: "athletic cotton socks 6 pairs",
    image: "../Images/Item-Image/athletic-cotton-socks-6-pairs.jpg",
    rating: "../Images/Rating-Images/rating-45.png",
    count:   87,
    price: "10.90$",
    CheckMark: "../Images/checkmark.png",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],
    size:[
  
    ],
  },
]

const HeaderBuilder = () => {
  const HeaderComponent = `
    <section class="left-header">
      <a class="logo-link" href="https://www.amazon.com/">
        <img class="logo" src="../Images/Icons/amazon-logo-white.png" alt="Amazon-Logo">
      </a>
    </section>

    <section class="center-header">
      <input type="text" name="Searchbar" placeholder="Search" class="searchbar">
      <button class="search-button"><img class="search-icon" src="../Images/Icons/search-icon.png"></button>
    </section>

    <section class="right-header">
    <a class="orders-link header-link" href="orders">
      <span class="returns-text">Returns</span>
      <span class="orders-text">&amp; Orders</span>
    </a>

    <a class="cart-link header-link" href="checkout">
      <img class="cart-icon" src="../Images/Icons/cart-icon.png">
      <div class="js-cart-quantity cart-quantity">
      </div>
      <div class="cart-text">Cart</div>
    </a>
  </section>
    `
  document.getElementById("header").innerHTML = HeaderComponent
}

const MainBuilder = () => {
  Items.forEach((Item) => {
    var Component = `
      <section class="product-container" >
        <div class="product-image-container">
          <img class="product-image" src="${Item.image}" data-testid="product-image">
        </div>
          <div class="product-name">
          ${Item.name}
          </div>
          <div class="product-rating-container">
            <img class="product-rating-stars" src="${Item.rating}">
            <div class="product-rating-count">
            ${Item.count}
            </div>
          </div>
          <div class="product-price">
          ${Item.price}
          </div>
          <div class="product-quantity-container">
            <select name="Quantity" class="js-quantity-selector">
              <option value="1">1</option>
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
          <div class="added-to-cart-message">
            <img src="../Images/Icons/checkmark.png" class="added-to-cart-icon">
          </div>`
          Component += ObjectsList(Item)
          Component += `<button class="js-add-to-cart-button
          add-to-cart-button button-primary" type="submit">
          Add to Cart
        </button>
      </section>
    `;
    document.querySelector(".Item-grid").innerHTML += Component;

  });
}

const ObjectsList = (Item) => {
  let componentHtml = '<div class="product-objects-list">';
  if (Item.color.length !== 0) {
    componentHtml += '<label class="color-label">Color:</label>';
    componentHtml += Item.color.map(color => `<button class="js-size-selector" type="submit">${color}</button>`).join('');
  }
  if (Item.set.length !== 0) {
    componentHtml += '<label class="set-label">Set:</label>';
    componentHtml += Item.set.map(set => `<button class="js-size-selector" type="submit">${set}</button>`).join('');
  }
  if (Item.size.length !== 0) {
    componentHtml += '<label class="size-label">Size:</label>';
    componentHtml += Item.size.map(size => `<button class="js-size-selector" type="submit">${size}</button>`).join('');
  }
  if (Item.style.length !== 0) {
    componentHtml += '<label class="style-label">Style:</label>';
    componentHtml += Item.style.map(style => `<button class="js-size-selector" type="submit">${style}</button>`).join('');
  }
  componentHtml += '</div>';
  return componentHtml;
}

const Start = () => {
  HeaderBuilder();
  MainBuilder();
}


const Getelement = (id) => {
  Items.forEach(item => {
    if(item.id === id) return item;
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
  Start();
  
});
