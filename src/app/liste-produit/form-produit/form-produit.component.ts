import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  fileUrl :string;
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
      genre:''
    })
  }

  onSaveProduit() {
    const nomProduit = this.produitForm.get('nomProduit').value;
    const nomVendeur = this.produitForm.get('nomVendeur').value;
    const contactVendeur = this.produitForm.get('contactVendeur').value;
    const genre= this.produitForm.get('genre').value;
    var newProduit = new Produit(nomProduit,nomVendeur,contactVendeur,genre);
    
    /* if (this.fileUrl && this.fileUrl != ''){
      newProduit.photo= this.fileUrl
    } */
    this.produitService.createNewProduit(newProduit);
    this.router.navigate(['/produits']);
  }

  /* onUploadFile(file:File){
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
  } */

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event) {
    this.isHovering = event;
  }

  onDrop(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files.item(i));
    }
  }
}
