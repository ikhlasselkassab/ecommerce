import { Component, Input, OnInit } from '@angular/core';
import { LignePanier } from '../models/LignePanier';
import { PanierService } from '../services/panier.service';
import {NgForOf, NgIf} from '@angular/common';
import {ProductItemComponent} from '../product-item/product-item.component';
import {Router, RouterLink} from '@angular/router';

import {NavebarComponent} from '../navebar/navebar.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  imports: [NgIf, NgForOf, RouterLink, NavebarComponent],

  standalone: true,
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private panierService: PanierService,
    private authService: AuthService, // Inject AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.panierService.cartItems$.subscribe((items: any[]) => {
      this.cartItems = items;
    });
  }

  removeItem(productId: number) {
    this.panierService.removeItem(productId);
  }

  getTotal(): number {
    return this.panierService.getTotal();
  }

  // Method to handle checkout
  checkout() {
    if (this.authService.isAuthenticated()) {
      // L'utilisateur est authentifié, procédez au paiement
      console.log('Proceeding to checkout...');
      this.router.navigate(['/checkout']);
      // Logique de paiement ici
    } else {
      // Rediriger vers la page d'authentification
      this.router.navigate(['/auth'], { queryParams: { returnUrl: '/panier' } });
    }
  }
  increaseQuantity(item: any): void {
    if (item.qte < 99) { // Optional limit to quantity
      item.qte++;
    }
    this.updateCart(); // Update the cart after modification
  }
  updateCart(): void {
    // Save the updated cart, e.g., to local storage or notify a service
    console.log('Cart updated:', this.cartItems);
  }

  // Function to decrease quantity
  decreaseQuantity(item: any): void {
    if (item.qte > 1) { // Prevent going below 1
      item.qte--;
    }
    this.updateCart(); // Update the cart after modification
  }


  // Handle logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
