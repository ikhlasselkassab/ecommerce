import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductService } from './services/product.service';
import { PanierService } from './services/panier.service';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth-interceptor.service';

import {Firestore} from '@angular/fire/firestore';
import {CommandeService} from './services/commande.service';


const firebaseConfig = {
  apiKey: "AIzaSyDCsKBoykaCo7x4wUIjOHfy6hn-H2Drx5A",
  authDomain: "ecommerce-94ee6.firebaseapp.com",
  projectId: "ecommerce-94ee6",
  storageBucket: "ecommerce-94ee6.firebasestorage.app",
  messagingSenderId: "109863609675",
  appId: "1:109863609675:web:5e7b85d1ecc2e64cb7b4ce",
  measurementId: "G-YBPDS2WL4D"
};



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ProductService,
    PanierService,
    CommandeService,
    AuthService, {
     provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi:true
    },

    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    importProvidersFrom(AngularFireAuthModule),
    importProvidersFrom(Firestore),


    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
