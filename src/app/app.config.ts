import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ProductService } from './services/product.service';
import { PanierService } from './services/panier.service';
import { AuthService } from './services/auth.service';
import { provideClientHydration } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';


const firebaseConfig = {
  apiKey: "AIzaSyA6SaBZOb2TwJcsQVCGz37gayPHMK8kr-E",
  authDomain: "ecommerce-a40f4.firebaseapp.com",
  projectId: "ecommerce-a40f4",
  storageBucket: "ecommerce-a40f4.appspot.com",
  messagingSenderId: "103656192710",
  appId: "1:103656192710:web:093834f6bff76633edf5c7"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ProductService,
    PanierService,
    AuthService,


    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    importProvidersFrom(AngularFireAuthModule),


    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
