import { products } from "../data/products";

export class Product{
  constructor(id, image, name, Stars,count , priceCents, keywords){
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating.Stars = Stars;
    this.rating.count = count;
    this.priceCents = priceCents;
    this.keywords = keywords;
  }

}
export function GetProduct(productid) {
  let matchingproducts;
  products.forEach(product => {
    if (productid === this.id) {
      matchingproducts = product;
    }
  })
  return matchingproducts
}