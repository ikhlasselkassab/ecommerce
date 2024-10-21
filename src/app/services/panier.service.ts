import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LignePanier } from '../models/LignePanier';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private cartItemsSubject = new BehaviorSubject<LignePanier[]>(this.getCartFromLocalStorage());
  cartItems$ = this.cartItemsSubject.asObservable();


  private saveCartToLocalStorage(cartItems: LignePanier[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Retrieve cart items from localStorage
  private getCartFromLocalStorage(): LignePanier[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  restoreStoredItems() {
    this.cartItemsSubject.next(this.getCartFromLocalStorage());
  }


  // Add product to cart
  addProduct(product: any) {
    const currentItems = this.cartItemsSubject.value;
    const existingProductIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingProductIndex > -1) {
      // If product already exists, increment its quantity
      currentItems[existingProductIndex].qte++;
    } else {
      // If product does not exist, add it with a quantity of 1
      currentItems.push({ product, qte: 1 });
    }

    // Emit new cart state and save to localStorage
    this.cartItemsSubject.next(currentItems);
    this.saveCartToLocalStorage(currentItems);
  }

  // Remove product from cart
  removeItem(productId: number) {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
  }

  // Clear cart
  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  // Calculate total price
  getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.qte * item.product.price), 0);
  }

  // Calculate total number of items in cart
  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.qte, 0);
  }

  // Get current cart items
  getCartItems(): LignePanier[] {
    return this.cartItemsSubject.value;
  }
}
