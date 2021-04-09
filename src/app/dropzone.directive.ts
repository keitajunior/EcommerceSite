/* L'aspect le plus important de la directive ci-dessous est qu'elle 
écoute l'événement drop sur l'élément parent. Cet événement contient 
la FileList que l'utilisateur souhaite télécharger. Ces données sont 
émises en tant qu'événement personnalisé afin qu'elles puissent être 
utilisées par notre composant Uploader à l'étape suivante.
De plus, nous écoutons les événements dragover / dragleave 
afin de pouvoir basculer les styles CSS lorsque l'utilisateur 
survole la zone de dépôt. */
import { Directive, HostListener, Output,EventEmitter } from '@angular/core';


@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  @Output() dropped = new EventEmitter<FileList>()
  @Output() hovered = new EventEmitter<boolean>();
 
  @HostListener('drop', ['$event'])
  onDrop($event){
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('drageover', ['$event'])
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  @HostListener ('dragleave', ['$event'])
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
