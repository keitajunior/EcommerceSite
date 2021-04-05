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
  fileIsUploading = false;
  fileUrl:string;
  fileUploaded=false;
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
    })
  }

  onSaveProduit() {
    const nomProduit = this.produitForm.get('nomProduit').value;
    const nomVendeur = this.produitForm.get('nomVendeur').value;
    const contactVendeur = this.produitForm.get('contactVendeur').value;
    const detail = this.produitForm.get('detail').value;
    const newProduit = new Produit(nomProduit,nomVendeur,contactVendeur);
    newProduit.detail = detail;

    if (this.fileUrl && this.fileUrl !==''){
      newProduit.photo = this.fileUrl;
    }
    
    this.produitService.createNewProduit(newProduit);
    this.router.navigate(['/produits']);
  }

  onUploadFile(file:File){
    this.fileIsUploading = true;
    this.produitService.uploadFile(file).then(
      (url:string)=>{
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    )
  }
  //methode permettant de relier input:file à la methode uploadFile
  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }
}
