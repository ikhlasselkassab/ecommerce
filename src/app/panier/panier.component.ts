import { Component, OnInit } from '@angular/core';
import { LignePanier } from '../models/LignePanier';
import { PanierService } from '../services/panier.service';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

import {Router, RouterLink} from '@angular/router';

import {NavebarComponent} from '../navebar/navebar.component';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {Commande} from '../models/Commande';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {CommandeService} from '../services/commande.service';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  imports: [NgIf, NgForOf, RouterLink, NavebarComponent, AsyncPipe],

  standalone: true,
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];
  isAuthenticated$: Observable<boolean> | undefined;

  constructor(
    private panierService: PanierService,
    private authService: AuthService,
    private router: Router,
    private commandeService: CommandeService,
    private afAuth: AngularFireAuth
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

  checkout(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        console.log('Proceeding to checkout...');
        this.router.navigate(['/checkout']);
      } else {
        this.router.navigate(['/auth'], { queryParams: { returnUrl: '/panier' } });
      }
    });
  }

  increaseQuantity(item: any): void {
    if (item.qte < 99) {
      item.qte++;
    }
    this.updateCart();
  }
  updateCart(): void {
    console.log('Cart updated:', this.cartItems);
  }


  decreaseQuantity(item: any): void {
    if (item.qte > 1) {
      item.qte--;
    }
    this.updateCart();
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  onCreateCommande(): void {

    this.authService.afAuth.currentUser.then((user) => {
      if (user && user.uid) {
        const userId = user.uid;


        const commande: Commande = this.panierService.createCommande(userId);
        console.log('Commande créée avec succès:', commande);
        alert('Commande créée avec succès !');
      } else {
        console.error('Utilisateur non connecté');
        alert('Veuillez vous connecter pour créer une commande.');
      }
    }).catch((error) => {
      console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
    });
  }

  createCommande() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        const details: LignePanier[] = this.panierService.getCartItems();
        const montant: number = this.panierService.getTotal();

        this.commandeService.addCommande(userId, details, montant);

        alert('Commande créée avec succès !');
      } else {
        console.error('Utilisateur non connecté');
        alert('Veuillez vous connecter pour créer une commande.');
      }
    });
  }
  async passerCommande(): Promise<void> {
    const userId = await this.authService.getCurrentUserId();
    if (userId) {
      const details = this.panierService.getCartItems();
      const montant = this.panierService.getTotal();
      this.commandeService.addCommande(userId, details, montant);

      this.panierService.clearCart();
      alert('Commande passée avec succès !');

    } else {
      alert('Veuillez vous connecter pour passer une commande.');
    }
  }


  async placeOrder(): Promise<void> {
    try {
      const userId = await this.authService.getCurrentUserId();

      if (userId) {

        const details = this.panierService.getCartItems();
        const amount = this.panierService.getTotal();

        const orderItems = details.map(item => ({
          productTitle: item.product.title,
          quantity: item.qte,
          price: item.product.price
        }));
        await this.commandeService.addOrder(orderItems,amount, userId);

        console.log('Order placed successfully');
        this.panierService.clearCart();
        this.router.navigate(['/order-success']);
      } else {
        console.log('User not authenticated.');
        alert('Connectez vous pour passer votre commande!')
        this.router.navigate(['/auth']);
      }
    } catch (error) {
      console.log('Error placing order:', error);
      alert('erreur ! Veuillez réessayer!')
    }
  }




}
