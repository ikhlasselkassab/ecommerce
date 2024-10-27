import { Component, Input, OnInit } from '@angular/core';
import { LignePanier } from '../models/LignePanier';
import { PanierService } from '../services/panier.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {ProductItemComponent} from '../product-item/product-item.component';
import {Router, RouterLink} from '@angular/router';

import {NavebarComponent} from '../navebar/navebar.component';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  imports: [NgIf, NgForOf, RouterLink, NavebarComponent, AsyncPipe],

  standalone: true,
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];
  isAuthenticated$: Observable<boolean>;

  constructor(
    private panierService: PanierService,
    private authService: AuthService, // Inject AuthService
    private router: Router
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$
  }

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
  checkout(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        console.log('Proceeding to checkout...');
        this.router.navigate(['/checkout']);
      } else {
        // Redirect to authentication page, preserving the return URL
        this.router.navigate(['/auth'], { queryParams: { returnUrl: '/panier' } });
      }
    });
  }

  increaseQuantity(item: any): void {
    if (item.qte < 99) { // Optional limit to quantity
      item.qte++;
    }
    this.updateCart(); // Update the cart after modification
  }
  updateCart(): void {
    console.log('Cart updated:', this.cartItems);
  }


  decreaseQuantity(item: any): void {
    if (item.qte > 1) { // Prevent going below 1
      item.qte--;
    }
    this.updateCart();
  }


  // Handle logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }


}
