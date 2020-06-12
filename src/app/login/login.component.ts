import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InOutService } from '../services/in-out.service';
import { SpbService } from '../services/spb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorInput = false;
  connectInput = false;
  connect = false;
  pseudo = '';
  userAuth;

  monForm: FormGroup;
  constructor(private fb: FormBuilder, private spb: SpbService, private router: Router) {
    this.monForm = this.fb.group({
      pseudo: [''],
      mdp: ['']
    });
  }

  ngOnInit() { 
   
  }

  onSubmit() {
    //this.errorInput = !this.errorInput;
    this.errorInput = false;
    this.connectInput = false;
    this.monForm.markAllAsTouched();
    console.log(this.monForm.value);
    this.verifUser();
  }

  verifUser() {
    this.spb.login(this.monForm.value.pseudo, this.monForm.value.mdp);
    this.getIsAuthenticated();
    console.log("verif user du login form effectué, login etgetisAuthenticated");
  }

  getIsAuthenticated() {
    this.spb.getIsAuthenticated().subscribe(
      data => {
        this.connect = data;
        console.log("dans login getisAuthenticated recuperation de l'observable this.connect > " , data)
        if (this.connect === true) {
          console.log('utilisateur authentifié' , this.connect);
          this.connectInput = true;
          this.userAuth = this.spb.getUserAuthenticated();

          console.log( this.userAuth,  " va aller sur spb");
          this.router.navigate(['/spb'])
          //setTimeout(() => this.router.navigate(['/spb']), 2000);
          this.monForm = this.fb.group({
            pseudo: [''],
            mdp: ['']
          });
          this.errorInput = false;
        }
        else{
          console.log(" Mot de passe erroné : this.connect > ", this.connect )
          this.errorInput = true;
        }
      }
      ,
      error => console.log("Erreur de récuperation de isauthenticated")
    )
  }
  

}