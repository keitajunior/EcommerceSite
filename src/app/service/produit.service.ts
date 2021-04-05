import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Produit} from '../models/produit.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  produits: Produit[] = [];
  produitSubject = new Subject<Produit[]>();
  constructor() { }


  emitProduits() {
    this.produitSubject.next(this.produits);
  }

  saveProduits() {
    firebase.database().ref('/produits').set(this.produits);//set agit comme put
  }

  getProduits() {
    firebase.database().ref('/produits')
      .on('value', (data)=>{
        this.produits = data.val() ? data.val() : [];
        this.emitProduits();
      })
  }

  getSingleProduit(id: number) {
     return new Promise(
       (resolve,reject) => {
         firebase.database().ref('/produits/' + id).once('value').then(
           (data)=>{
             resolve(data.val());
           },(error)=>{
             reject(error);
           }
         )
       }
     )
  }

  createNewProduit(newProduit : Produit){
    this.produits.push(newProduit);
    this.saveProduits();
    this.emitProduits();
  }

  removeProduit(produit:Produit) {
    if(produit.photo) {
        const storageRef= firebase.storage().refFromURL(produit.photo);
        storageRef.delete().then(
          ()=>{
            console.log('Photo supprimée !');
          }
        ).catch(
          (error)=>{
            console.log('Fichier non trouvé :'+ error)
          }
        )  
    }
    const produitIndexToRemove = this.produits.findIndex(
      (produitEl) => {
        if (produitEl === produit) {
          return true;
        }
      }
    );
    this.produits.splice(produitIndexToRemove, 1);
    this.saveProduits();
    this.emitProduits();  
  }

  uploadFile(file:File){
    return new Promise(
      (resolve,reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
          upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot)=>{
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('telechargement ' + progress + '% fait');
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('telechargement en pause');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('telechargement...');
                    break;
                }
            },
            (error)=>{
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  console.log('permission non accordée')
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  console.log('telechargement annulé')
                  break;
          
                // ...
          
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  console.log('inconnu erreur'+error.serverResponse)
                  break;
                  reject();
              }
            },
            ()=>{
                resolve(upload.snapshot.ref.getDownloadURL().then(
                  (downloadURL) => {
                    console.log('fichier disponible sur ', downloadURL);
                  })
                ) 
           }
        )
  })
  }
}
