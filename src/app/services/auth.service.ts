// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { PanierService } from './panier.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(public afAuth: AngularFireAuth, private router: Router , private panierService: PanierService) {
    this.afAuth.authState.subscribe(user => {
      this.isAuthenticatedSubject.next(!!user);
    });
  }


  login(email: string, password: string, returnUrl: string = ''): void {
    console.log('Tentative de connexion...');
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.isAuthenticatedSubject.next(true);
        this.panierService.restoreStoredItems();
        this.router.navigate([returnUrl || '/']);
      })
      .catch((error) => {
        console.error('Erreur de connexion:', error);
      });
  }



  signUp(email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log('Utilisateur inscrit avec succès:', result);
        this.router.navigate(['/auth']); // Redirige vers la page de connexion
      })
      .catch(error => console.error('Erreur lors de l\'inscription:', error));
  }


  logout(): void {
    this.afAuth.signOut().then(() => {
      this.panierService.clearCart();
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/']);
    });
  }


  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser; // Await the promise to get the current user
    return user ? user.uid : null; // Return user ID or null if not authenticated
  }
}
