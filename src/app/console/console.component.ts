import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
    $

  users;
  isEdtUser = false;
  edtUser;
  roles;
  formEdit: FormGroup;

  films: any;

  constructor(private spb: SpbService, private fb: FormBuilder) {
    this.formEdit = this.fb.group({
      roleControl: ['USER']
    });


  }

  ngOnInit(): void {
    this.roles = this.spb.getRoles();
    this.recupereUsers();
    this.recupereFilms();
  }


  recupereUsers() {
    this.spb.getUsers().subscribe(
      data => {
        this.users = data;
      }
    );

  }

  deleteUser(user) {

    if (confirm('Etes-vous sur de vouloir supprimer cet utilisateur, ' + user.pseudo + ' !')) {
      this.spb.deteleUser(user);
    }
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
    if (confirm('Etes-vous sur de vouloir valider ce role,  "' + this.formEdit.value.roleControl + '" !')) {

      this.isEdtUser = !this.isEdtUser;
      this.spb.validRoleUser(user, this.formEdit.value);
      
    }
    this.recupereUsers();

  }

  deleteFilm(user, cart) {
    console.log(cart);
    if (confirm('Etes-vous sur de vouloir supprimer ce film,  "' + cart.filmdb.title + '" !')) {
      cart.inCart = false;
      this.spb.setUsers(this.users);
      this.spb.setCarts(user.carts);
    }
    this.recupereUsers();
  }


  recupereFilms() {
    this.spb.getAllMovies().subscribe(
      data => {
        this.films = data['_embedded']['movies'];
        console.log(this.films);
      }
    )
  }


}
