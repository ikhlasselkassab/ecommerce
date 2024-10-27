import { Product } from "./Product";

export class LignePanier {

  qte: number ;
  product: Product;
  constructor(qte: number,product: Product) {
    this.qte =qte;
    this.product = product;

  }
}
