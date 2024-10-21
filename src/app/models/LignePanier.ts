import { Product } from "./Product";

export class LignePanier {

  qte: number ;
  product: Product;



  // Constructor to initialize the Product properties
  constructor(qte: number,product: Product) {
    this.qte =qte;
    this.product = product;

  }
}
