import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {PanierService} from './panier.service';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import {Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import User = firebase.User;
import {initializeApp} from '@angular/fire/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth!: Auth;
  private authenticated = false;
  user$: Observable<firebase.User | null>;




  constructor(private afAuth: AngularFireAuth,private router: Router,private panierService: PanierService) {
    this.user$ = afAuth.authState;
    const firebaseConfig = {
      apiKey: "AIzaSyAUOE-13i8UR2HM98vk8lNM_FlWH7-mcn8",
      authDomain: "shopapp-16472.firebaseapp.com",
      projectId: "shopapp-16472",
      storageBucket: "shopapp-16472.appspot.com",
      messagingSenderId: "163064975894",
      appId: "1:163064975894:web:71e829a8c81bb6fbf39b37",
      measurementId: "G-QTCJCYNKBR"
    };
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);// Observable to track authentication state
  }


  isAuthenticated(): boolean {
    return this.authenticated;
  }

  //logout(): void {
    //this.authenticated = false;
    //this.panierService.clearCart()
    //this.router.navigate(['']);
  //}
  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign in with email and password
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  signInWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }


  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }


}

