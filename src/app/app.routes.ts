import { Routes  } from '@angular/router';
import {ListproduitComponent} from './listproduit/listproduit.component';
import {PanierComponent} from './panier/panier.component';
import {AuthComponent} from './auth/auth.component';
import {SignupComponent} from './signup/signup.component';
import {DetailProduitComponent} from './detail-produit/detail-produit.component';
import {AuthGuard} from './auth.guard';
import {CheckoutComponent} from './checkout/checkout.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {CommandeComponent} from './commande/commande.component';

export const routes: Routes = [
  {path:'',component:ListproduitComponent},
  {path:'produit/:id', component: DetailProduitComponent},
  {
    path: 'panier',
    component: PanierComponent //I can apply also here the AuthGuard

  },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {path:'auth',component:AuthComponent},
  {path:'sign-up',component:SignupComponent},
  {path: 'products/:id', component: DetailProduitComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'commande', component: CommandeComponent },

  {
    path: 'not-found',
    redirectTo: 'not-found',
  }

];
