import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorInput = false;

  monForm: FormGroup;
  constructor(private fb: FormBuilder, private inoutService: InOutService) {
    this.monForm = this.fb.group({
      pseudo: [''], 
      mdp: ['']
    });

    this.inoutService.setAfficheThisFilm(null);
  }

  ngOnInit() { }

  onSubmit() {
    this.monForm.markAllAsTouched();
    console.log(this.monForm.value);
  }

}