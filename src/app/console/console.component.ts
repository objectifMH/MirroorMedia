import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {$
  
  users;
  isEdtUser = false;
  edtUser;
  roles;
  formEdit: FormGroup;

  constructor(private spb: SpbService, private fb: FormBuilder) {
    this.formEdit = this.fb.group({
      roleControl: ['USER']
    });


   }

  ngOnInit(): void {
    

    this.roles = this.spb.getRoles();
    this.recupereUsers();
  }


  recupereUsers() {
    this.users = this.spb.getUsers();

  }

  deleteUser(user) {
    this.spb.deteleUser(user);
    this.recupereUsers();
  }

  editUser(user) {
    this.formEdit = this.fb.group({
      roleControl: [user.role]
    });
    
    this.isEdtUser = !this.isEdtUser;
    this.edtUser = user;
  }

  validRoleUser(user) {
    this.isEdtUser = !this.isEdtUser;
    console.log(user, this.formEdit.value);
    this.spb.validRoleUser(user, this.formEdit.value);
    this.recupereUsers();

  }



}
