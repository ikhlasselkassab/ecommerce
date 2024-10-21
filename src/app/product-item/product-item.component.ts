import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/Product';
import { RouterLink} from '@angular/router';
import {NgIf, NgStyle} from '@angular/common';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    RouterLink
  ],
  providers: [],
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;

  @Output() selectedProduct = new EventEmitter<Product>();

  @Output() addToCart = new EventEmitter<Product>();

  constructor() {}



  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  getColor(stock: number) {
    return stock > 0 ? 'green' : 'red';
  }

  getstate() {
    return this.product.stock ? "En stock" : "En rupture de stock";
  }




}
