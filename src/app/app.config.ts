import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {PanierService} from './services/panier.service';
import {provideClientHydration} from '@angular/platform-browser';
import {AuthService} from './services/auth.service';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';



const firebaseConfig = {
  apiKey: "AIzaSyAUOE-13i8UR2HM98vk8lNM_FlWH7-mcn8",
  authDomain: "shopapp-16472.firebaseapp.com",
  projectId: "shopapp-16472",
  storageBucket: "shopapp-16472.appspot.com",
  messagingSenderId: "163064975894",
  appId: "1:163064975894:web:71e829a8c81bb6fbf39b37",
  measurementId: "G-QTCJCYNKBR"
};
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),HttpClient,ProductService,PanierService,provideHttpClient(),
    AuthService,
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
  importProvidersFrom(AngularFireAuthModule),importProvidersFrom(AngularFireAuth),],

};

