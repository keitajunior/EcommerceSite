import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilComponent } from './auth/profil/profil.component';
import { PublierAnnonceComponent } from './auth/publier-annonce/publier-annonce.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { FormProduitComponent } from './liste-produit/form-produit/form-produit.component';
import { UnProduitComponent } from './liste-produit/un-produit/un-produit.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service'
import { ProduitService } from './service/produit.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NewAccountComponent } from './auth/new-account/new-account.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    PublierAnnonceComponent,
    FourOhFourComponent,
    ListeProduitComponent,
    FormProduitComponent,
    UnProduitComponent,
    NavigationComponent,
    NewAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ProduitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
