import { Component } from '@angular/core';
import firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDrWbHD5wt6yVxj3EumhlzVQQLmroBZs2g",
      authDomain: "ecom-55eed.firebaseapp.com",
      databaseURL: "https://ecom-55eed-default-rtdb.firebaseio.com",
      projectId: "ecom-55eed",
      storageBucket: "ecom-55eed.appspot.com",
      messagingSenderId: "373928518637",
      appId: "1:373928518637:web:0333ab15d447ebe4297de4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
