import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import firebase from 'firebase';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isAuth: boolean;
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.isAuth = true;
        }
        else{
          this.isAuth = false;
        } 
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
