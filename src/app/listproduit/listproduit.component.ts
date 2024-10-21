import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';
import { PanierService } from '../services/panier.service';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';

import {ProductItemComponent} from '../product-item/product-item.component';
import {PanierComponent} from '../panier/panier.component';
import {NavebarComponent} from '../navebar/navebar.component';
import {CommonModule, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  standalone: true,
  imports: [CommonModule,
    ProductItemComponent,
    PanierComponent,
    NavebarComponent,
    NgForOf,
    NgIf, FormsModule
  ],

  styleUrls: ['./listproduit.component.css']
})
export class ListproduitComponent implements OnInit {
  products!: Product[];
  filteredProducts: Product[] = [];
  categories: { slug: string; name: string; url: string }[] = [];
  productForm: FormGroup;
  showCart: boolean = false;
  cartItemCount: number = 0;
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private panierService: PanierService,
    private fb: FormBuilder,

  ) {
    this.productForm = this.fb.group({
      category: ['']
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.productForm.get('category')?.valueChanges.subscribe(value => {
      this.onCategoryChange(value);
    });
    this.updateCartCount();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response.products;
      this.filteredProducts = this.products;
    });
  }

  getAllCategories() {
    this.productService.getCategories().subscribe((response: any) => {
      this.categories = response;
    });
  }

  onCategoryChange(category: string): void {
    if (category) {
      this.productService.getProductByCategory(category).subscribe((response: any) => {
        this.filteredProducts = response.products;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  updateCartCount(): void {
    this.cartItemCount = this.panierService.getTotalItems();
  }

  addProductToCart(product: Product): void {
    console.log('Ajout du produit au panier :', product);
    this.panierService.addProduct(product);
    this.updateCartCount();
    this.showCart = true;
    alert(`${product.title} ajouté au panier avec succès`);

  }


  filterProduits(): void {
    this.filteredProducts = this.searchTerm
      ? this.products.filter(product => product.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : this.products;
  }
}
