import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zipCodeValidator, mdpValidator } from '../validators';
import { InOutService } from '../services/in-out.service';
import { SpbService } from '../services/spb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {

  errorInput = false;
  inscription = false;


  monForm: FormGroup;
  constructor(private fb: FormBuilder, private inoutService: InOutService, private spb: SpbService, private router: Router) {
    this.monForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(4)]], //required dans le html soit ici avec les validators 
      mdp: ['', Validators.minLength(4)],
      confMdp: ['', mdpValidator],
      zip: ['', zipCodeValidator]
    });


    //si on change le mdp on update l'état de la confirmation : 
    this.monForm.controls.mdp.valueChanges.subscribe(
      x => this.monForm.controls.confMdp.updateValueAndValidity()
    );


    this.inoutService.setAfficheThisFilm(null);
  }

  ngOnInit() {
    // console.log(this.spb.getUsers());
  }

  onSubmit() {
    // this.count++;
    console.log(this.monForm.value, this.monForm.touched);

    if (this.monForm.status ===  'VALID')
     {
      const res = this.spb.inscription(this.monForm.value.pseudo, this.monForm.value.mdp);
      this.errorInput = !res;
      this.inscription = res;
      if (res) {
        setTimeout(() => this.router.navigate(['/login']), 2000);
      }
      // console.log(this.spb.getUsers());
    } else {
      this.monForm.markAllAsTouched();
    }


  }

}
