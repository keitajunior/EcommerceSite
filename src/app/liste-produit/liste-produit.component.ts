import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../service/produit.service';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
export class ListeProduitComponent implements OnInit, OnDestroy {

  produits: Produit[];
  produitsSubscription: Subscription;
  constructor( private produitService: ProduitService,
               private router: Router) { }

  ngOnInit(): void {
    this.produitsSubscription = this.produitService.produitSubject.subscribe(
      (produits: Produit[]) => {
        this.produits = produits;
      }
    )
    this.produitService.getProduits();
    this.produitService.emitProduits();
  }

  onNewProduit() {
    this.router.navigate(['/produits','ajout']);
  }

  onDeleteProduit(produit: Produit) {
    this.produitService.removeProduit(produit);
  }

  onViewProduit(id:number){
    this.router.navigate(['/produits', 'unproduit', id]);
  }

  ngOnDestroy(){
    this.produitsSubscription.unsubscribe();
  }


}
