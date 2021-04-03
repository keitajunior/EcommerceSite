import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAccountComponent } from './auth/new-account/new-account.component';

import { ProfilComponent } from './auth/profil/profil.component';
import { PublierAnnonceComponent } from './auth/publier-annonce/publier-annonce.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { FormProduitComponent } from './liste-produit/form-produit/form-produit.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { UnProduitComponent } from './liste-produit/un-produit/un-produit.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path:'auth/annonce' , component: PublierAnnonceComponent },
  { path: 'auth/profil' , canActivate:[AuthGuardService],component: ProfilComponent},
  { path: 'auth/newaccount' , component: NewAccountComponent},
  { path: 'produits' , component: ListeProduitComponent},
  { path: 'produits/ajout',canActivate:[AuthGuardService], component: FormProduitComponent },
  { path: 'produits/unproduit/:id', component: UnProduitComponent},
  { path: 'introuvable', component: FourOhFourComponent},
  { path:'',redirectTo: 'produits', pathMatch: 'full'},
  { path: '**' ,redirectTo: 'introuvable'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
