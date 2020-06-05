import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zipCodeValidator, mdpValidator } from '../validators';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {

  errorInput = false;

  monForm: FormGroup;
  constructor(private fb: FormBuilder, private inoutService: InOutService) {
    this.monForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(4)]  ], //required dans le html soit ici avec les validators 
      mdp: ['', Validators.minLength(4)  ],
      confMdp: ['', mdpValidator],
      zip: ['', zipCodeValidator]
    });


    //si on change le mdp on update l'état de la confirmation : 
    this.monForm.controls.mdp.valueChanges.subscribe(
      x => this.monForm.controls.confMdp.updateValueAndValidity()
    );


    this.inoutService.setAfficheThisFilm(null);
  }

  ngOnInit() { }

  onSubmit() {
    this.monForm.markAllAsTouched();
    console.log(this.monForm.value);
  }

}
