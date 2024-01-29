import { AddItemToCart } from Orders.js;
const Items =  [
  {
    name: "athletic cotton socks 6 pairs",
    image: "../Images/Item-Image/athletic-cotton-socks-6-pairs.jpg",
    rating: "../Images/Rating-Images/rating-45.png",
    price: "10.90$",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],size:[
  
    ],
  },
  {
    name: "intermediate composite basketball",
    image: "../Images/Item-Image/intermediate-composite-basketball.jpg",
    rating: "",
    price: "",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],size:[
  
    ],
  },
  {
    name: "",
    image: "",
    rating: "",
    price: "",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],size:[
  
    ],
  },
  {
    name: "",
    image: "",
    rating: "",
    price: "",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],size:[
  
    ],
  },
  {
    name: "",
    image: "",
    rating: "",
    price: "",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],size:[
  
    ],
  },
  {
    name: "",
    image: "",
    rating: "",
    price: "",
    color:[
  
    ],
    set:[
  
    ],
    style:[
  
    ],size:[
  
    ],
  },
]

const LeftSelector = () =>{
  const LeftHeader = document.createElement('section');
  LeftHeader.classList.add('Left-Header');
  Header.appendChild(LeftHeader);
  const ImageLogo = document.createElement('a');
  ImageLogo.classList.add('Image-Logo');
  ImageLogo.href = "Amazon.com";
  LeftHeader.appendChild(ImageLogo);
}

const CenterSelector = () => {
  const CenterHeader = document.createElement('section');
  CenterHeader.classList.add('Center-Header');
  Header.appendChild(CenterHeader);
  const SearchBox = document.createElement('input');
  SearchBox.classList.add('SearchBox');
  CenterHeader.appendChild(SearchBox);
  const SearchButton = document.createElement('button');
  SearchButton.classList.add('SearchButton');
  SearchButton.innerHTML = "Search";
  CenterHeader.appendChild(SearchButton);
}

const RightSelector = () => {
  const RightHeader = document.createElement('section');
  RightHeader.classList.add('Right-Header');
  Header.appendChild(RightHeader);
  const Cart = document.createElement('a');
  Cart.classList.add('cart-link');
  Cart.href = "Cart";
  RightHeader.appendChild(Cart);
  const CartIcon = document.createElement('img');
  CartIcon.classList.add('cart-icon');
  CartIcon.src = "../Images/cart.png";
  Cart.appendChild(CartIcon);
  const CartQuantity = document.createElement('div');
  CartQuantity.classList.add('js-cart-quantity');
  CartQuantity.classList.add('cart-quantity');
  Cart.appendChild(CartQuantity);
  const OrdersLink = document.createElement('a');
  OrdersLink.classList.add('orders-link');
  OrdersLink.href = "orders.html";
  RightHeader.appendChild(OrdersLink);
  const ReturnsText = document.createElement('span');
  ReturnsText.classList.add('returns-text');
  OrdersLink.appendChild(ReturnsText);
  const OrdersText = document.createElement('span');
  OrdersText.classList.add('orders-text');
  OrdersLink.appendChild(OrdersText);
}

const HeaderBuilder = () => {
  const Body = document.querySelector('body');
  const Header = document.querySelector('header');
  Body.appendChild(Header);
  LeftSelector();
  CenterSelector();
  RightSelector();
}

const ImageDiv = (item, Item) => {
  const div = document.createElement('div')
  div.className = 'product-image-container';
  item.appendChild(div);
  const Image = document.createElement('img');
  Image.className = 'product-image js-product-image';
  Image.setAttribute('alt', Item.name);
  Image.src = Item.image;
  div.appendChild(Image);
}

const NameDivAndRating = (item, Item) =>{
  let name = document.createElement('div');
  name.className = 'product-name limit-to-2-lines';
  name.innerHTML = Item.name;
  item.appendChild(name);
  let rating = document.createElement('div');
  rating.className = 'product-rating-container';
  item.appendChild(rating);
  let stars = document.createElement('img');
  stars.className = 'product-rating-stars';
  stars.src = Item.rating;
  rating.appendChild(stars);
  let count = document.createElement('div');
  count.className = 'product-rating-count link-primary';
  count.innerHTML = Item.count;
  rating.appendChild(count);
}

const PriceAndQuantity = (item, Item) =>{
  let price = document.createElement('div');
  price.className = 'product-price';
  price.innerHTML = Item.price;
  item.appendChild(price);
  let quantity = document.createElement('div');
  quantity.className = 'product-quantity-container';
  item.appendChild(quantity);
  let selector = document.createElement('input');
  selector.className = 'js-quantity-selector';
  selector.type = 'number';
  selector.max = '10';
  selector.min = '1';
  quantity.appendChild(selector);
}

const formSubmit = (item, Item) => {
  const Form = document.createElement('form');
  Form.className = 'js-add-to-cart-button';
  Form.method = 'POST';
  Form.id = 'js-add-to-cart';
  item.appendChild(Form);
  let button = document.createElement('button');
  button.className = 'js-add-to-cart-button add-to-cart-button button-primary';
  button.innerHTML = 'Add to cart';
  button.Id = Item.name;
  button.type = 'submit';
  Form.appendChild(button);
}

const Color = (item, Color) => {
  const colordiv = document.createElement('div');
  colordiv.className = 'color';
  item.appendChild(colordiv);
  const colorchoice = document.createElement('div');
  colorchoice.className = 'js-variation-options-container variation-options-container';
  item.appendChild(colorchoice);
  Color.forEach(color => {
    const colorbtn = document.createElement('button');
    colorbtn.className = 'js-variation-option variation-option js-selected-variation is-selected';
    colorbtn.innerHTML = color;
    item.appendChild(colorbtn);
    })
};

const set = (item, set) => {

}

const Size = (item, set) => {

}

const Style = (item, style) => {

}

const MainBuilder = () => {
  const Main = document.querySelector('main');
  Body.appendChild(Main);
  const ItemGrid = document.createElement('Section');
  Main.classList.add('Item-Grid');
  const item = document.createElement('Section');
  item.classList.add('Items');
  ItemGrid.appendChild(item);
  Items.forEach((Item) => {
    ImageDiv(item, Item);
    NameDivAndRating(item, Item);
    PriceAndQuantity(item, Item);
    formSubmit(item, Item);
    if(Item.color !== null) {
      Color(item, Item.color);
      
    }
    if(Item.set !== null) {
      Item.set.forEach(set => {
        set(item, set);
      });
    }
    if(Item.size !== null) {
      Item.size.forEach(size => {
        size(item, size);
      });
    }
    if(Item.style !== null) {
      Item.style.forEach(style => {
        Style(item, style);
      });
    }
  });
}
const Start = () => {
  HeaderBuilder();
  MainBuilder();
}

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  const form = document.getElementById(".js-add-to-cart");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let ItemId = document.getElementsByClassName("js-add-to-cart-button add-to-cart-button button-primary").Id;
    let Item = Getelement(ItemId);
    AddItemToCart(Item);
  });
});

const Getelement = (id) => {
  Items.forEach(item => {
    if(item.id === id) return item;
  });
}

Start();