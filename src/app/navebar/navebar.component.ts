
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Router, RouterLink,RouterModule} from '@angular/router';
import {ProductService} from '../services/product.service';
import {PanierService} from '../services/panier.service';
import {LignePanier} from '../models/LignePanier';
import {FormsModule} from '@angular/forms';
import {NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {PanierComponent} from '../panier/panier.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navebar',
  standalone: true,
  imports: [


    RouterLink,
    FormsModule,
    NgClass,
    NgIf,
    NgOptimizedImage
  ],

  templateUrl: './navebar.component.html',
  styleUrl: './navebar.component.css'
})
export class NavebarComponent implements OnInit {
  isSearchActive: boolean = false;
  @Output() currentPanier : LignePanier[]=[];
  @Output() displayedPanier = new EventEmitter<boolean> ;
  categories : string[]=[];
  @Output() searchedText = new EventEmitter<string>();
  totalItems: number= 0;
  private products: any;
  protected isAuthenticated= false;

  constructor (private productService : ProductService,private panierService : PanierService,private authService : AuthService) {}



  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.panierService.cartItems$.subscribe(cartItems => {
      this.totalItems = cartItems.reduce((total, item) => total + item.qte, 0);
    });

    this.productService.getCategories()
      .subscribe((response: any) => {
        this.categories = response;
      }, (error: any) => {
        console.error('Error fetching categories', error);
      });


    this.productService.getProductBycategory()
      .subscribe((response: any) => {
        this.products = response;
      }, (error: any) => {
        console.error('Error fetching products', error);
      });

  }
  onLogout(): void {
    this.authService.logout();

  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

}
