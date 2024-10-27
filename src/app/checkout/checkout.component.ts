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

    console.log('Order confirmed');
    this.panierService.clearCart();
    this.router.navigate(['/order-success']);
  }
}
