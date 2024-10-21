import { Component } from '@angular/core';
import { RouterOutlet,Router ,RouterModule } from '@angular/router';
import { ListproduitComponent } from './listproduit/listproduit.component';

import { PanierComponent } from './panier/panier.component';
import { NgForOf } from '@angular/common';
import {routes} from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

// @ts-ignore
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListproduitComponent,PanierComponent,NgForOf,ReactiveFormsModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shop_app';



}

