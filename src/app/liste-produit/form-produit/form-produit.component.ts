import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-form-produit',
  templateUrl: './form-produit.component.html',
  styleUrls: ['./form-produit.component.scss']
})
export class FormProduitComponent implements OnInit {

  produitForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
              private produitService: ProduitService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.produitForm = this.formBuilder.group({
      nomProduit: ['', Validators.required],
      nomVendeur: ['', Validators.required],
      contactVendeur: ['', Validators.required],
      detail : ['']
    })
  }

  onSaveProduit() {
    const nomProduit = this.produitForm.get('nomProduit').value;
    const nomVendeur = this.produitForm.get('nomVendeur').value;
    const contactVendeur = this.produitForm.get('contactVendeur').value;
    const detail = this.produitForm.get('detail').value;
    const newProduit = new Produit(nomProduit,nomVendeur,contactVendeur,detail);
    this.produitService.createNewProduit(newProduit);
    this.router.navigate(['/produits']);
  }
}
