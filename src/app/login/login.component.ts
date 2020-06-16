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

  userAuth = {pseudo: null};
  errorConnected = false;

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
    this.errorConnected = false ; 
    this.monForm.markAllAsTouched();
    console.log(this.monForm.value);
    this.verifUser();
  }

  verifUser() {
    this.spb.login(this.monForm.value.pseudo, this.monForm.value.mdp);
    this.getUserAuth();
  }

  getUserAuth() {
    this.spb.getUserAuthenticated().subscribe(
      data => {
        this.userAuth = data; 
        console.log(this.userAuth)
        if ( this.userAuth.pseudo )
        {
          
          setTimeout(() => this.router.navigate(['/spb']), 3000);
          this.monForm = this.fb.group({
            pseudo: [''],
            mdp: ['']
          });
        }
        else {
          this.errorConnected = true ; 
        }
      }
    )
  }


}