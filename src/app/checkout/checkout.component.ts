import {Component, OnInit} from '@angular/core';
import {PanierService} from '../services/panier.service';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private panierService: PanierService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.panierService.getCartItems();
    this.totalPrice = this.panierService.getTotal();
  }


  confirmOrder() {
    // Here you can implement your order processing logic (e.g., send the order to the server)
    console.log('Order confirmed');
    // After confirming the order, clear the cart and redirect to success page
    this.panierService.clearCart();
    this.router.navigate(['/order-success']);
  }
}
