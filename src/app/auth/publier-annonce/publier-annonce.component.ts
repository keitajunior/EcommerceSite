import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-publier-annonce',
  templateUrl: './publier-annonce.component.html',
  styleUrls: ['./publier-annonce.component.scss']
})
export class PublierAnnonceComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }

  onSubmit(){
    const email = this.signInForm.get('email').value
    const password = this.signInForm.get('password').value
    this.authService.signInUser(email,password).then(
      ()=>{
        this.router.navigate(['/produits/ajout'])
      },
      (error)=>{
        this.errorMessage = error;
      }
    )
  }

}
