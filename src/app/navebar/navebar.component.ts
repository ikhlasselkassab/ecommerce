
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
  searchKey !: string;
  @Output() searchedText = new EventEmitter<string>();
  totalItems: number= 0;
  private products: any;
  protected isAuthenticated= false;
  constructor (private productService : ProductService,private panierService : PanierService,private authService : AuthService) {}



  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();

    this.panierService.cartItems$.subscribe(cartItems => {
      this.totalItems = cartItems.reduce((total, item) => total + item.qte, 0);
    });

    // Récupération des catégories
    this.productService.getCategories()
      .subscribe((response: any) => {
        this.categories = response;
      }, (error: any) => {
        console.error('Error fetching categories', error);
      });

    // Récupération des produits par catégorie (si c'est nécessaire)
    this.productService.getProductBycategory()
      .subscribe((response: any) => {
        this.products = response; // Assurez-vous que `products` est défini dans votre composant
      }, (error: any) => {
        console.error('Error fetching products', error);
      });

  }
  onLogout(): void {
    this.authService.logout();
    this.isAuthenticated = false; // Met à jour l'état après la déconnexion
  }

  showPanier(){
    this.displayedPanier.emit(true);
  }


  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  onSearchByKey(){
    console.log(this.searchKey)
    this.searchedText.emit(this.searchKey)

  }





}
