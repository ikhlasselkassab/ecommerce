export class Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  images: string[];


  constructor(
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    stock: number,
    images: string[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.images = images;
  }
}
