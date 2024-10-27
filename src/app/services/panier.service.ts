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

  private getCartFromLocalStorage(): LignePanier[] {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  }

  restoreStoredItems() {
    this.cartItemsSubject.next(this.getCartFromLocalStorage());
  }

  addProduct(product: any) {
    const currentItems = this.cartItemsSubject.value;
    const existingProductIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (existingProductIndex > -1) {
      currentItems[existingProductIndex].qte++;
    } else {
      currentItems.push({ product, qte: 1 });
    }
    this.cartItemsSubject.next(currentItems);
    this.saveCartToLocalStorage(currentItems);
  }

  removeItem(productId: number) {
    const updatedItems = this.cartItemsSubject.value.filter(item => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCartToLocalStorage(updatedItems);
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.qte * item.product.price), 0);
  }

  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.qte, 0);
  }

  getCartItems(): LignePanier[] {
    return this.cartItemsSubject.value;
  }
}
