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
  constructor(private fb: FormBuilder, private spb: SpbService, private router: Router, private inout: InOutService) {
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
  }

  getIsAuthenticated() {
    this.spb.getIsAuthenticated().subscribe(
      data => {
        this.connect = data;
        if (this.connect === true) {
          this.connectInput = true;
          this.userAuth = this.spb.getUserAuthenticated();

          let setUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
          if (this.monForm.value.pseudo === setUser.pseudo) {
            this.spb.setUserAuthenticated(setUser);
          }
          else {
            this.inout.setCart({quantity: 0, total: 0});
          }

          
          this.inout.setCarts(this.userAuth.carts);
          console.log(this.userAuth, " va aller sur spb");
          //this.router.navigate(['/spb'])
          setTimeout(() => this.router.navigate(['/spb']), 3000);
          this.monForm = this.fb.group({
            pseudo: [''],
            mdp: ['']
          });
          this.errorInput = false;
        }
        else {
          this.errorInput = true;
        }
      }
      ,
      error => console.log("Erreur de récuperation de isauthenticated")
    )
  }


}