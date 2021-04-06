import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-un-produit',
  templateUrl: './un-produit.component.html',
  styleUrls: ['./un-produit.component.scss']
})
export class UnProduitComponent implements OnInit {

  produit: Produit;
  constructor(private route:ActivatedRoute,
              private produitService: ProduitService,
              private router: Router) { }

  ngOnInit(): void {
    this.produit = new Produit('','','','');
    const id = this.route.snapshot.params['id'];
    this.produitService.getSingleProduit(+id).then(
      (produit: Produit)=> {
        this.produit = produit;
      }
    );
  }

  onReturn() {
    this.router.navigate( ['/produits']);
  }

}
