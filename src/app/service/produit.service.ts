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
    if(produit.photos) {
      for (let tof of produit.photos){
        const storageRef= firebase.storage().refFromURL(tof);
        storageRef.delete().then(
          ()=>{
            console.log('photo supprimé');
          }
        ).catch(
          (error)=>{
            console.log('Fichier non trouvé :'+ error)
          }
        )
        }   
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
            ()=>{
              console.log('Chargement...');
            },
            (error)=>{
              console.log('Erreur de chargement'+ error);
              reject();
            },
              ()=>{
                resolve(upload.snapshot.downloadURL);
              }
          )
      }
    )
  }
}
