/* Chaque composant enfant est une UploadTask autonome qui commencera
 à s'exécuter dès que le composant sera initialisé. Il affichera la
  progression du téléchargement en temps réel et enregistrera l'URL
   de téléchargement dans Firestore une fois terminé.
   Le composant est responsable de la gestion de l'état du téléchargement */
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import {finalize, tap} from 'rxjs/operators'

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file : File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot :Observable<any>;
  downloadURL : string;

  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore){}

  ngOnInit(): void {
    this.startUpload();
  }

  startUpload(){
    //storage path
    const path = `images/${Date.now()}_${this.file.name}`;

    //Reference to storage bucket
    const ref =this.storage.ref(path);

    //the main task
    this.task = this.storage.upload(path,this.file);

    //Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.db.collection('files').add( { downloadURL: this.downloadURL, path });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
