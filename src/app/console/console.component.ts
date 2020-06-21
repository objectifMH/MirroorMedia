import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  

  users;
  isEdtUser = false;
  edtUser;
  roles;
  directors;
  acteurs;
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
    this.recupereDirectors();
    this.recupereActeurs();
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
    this.spb.getAllMoviesFull().subscribe(
      data => {
        this.films = data;
        console.log(this.films);

      }
    )
  }

  recupereDirectors() {
    this.spb.getAllDirectors().subscribe(
      data => {
        this.directors = data['_embedded']['directors'];
        this.directors.map(di => di.films = []);
        console.log(this.directors);
        this.spb.getAllDirectorsFull().subscribe(
          dataD => {
            let directorsFull;
            // tslint:disable-next-line:forin
            for (const i in dataD) {
              directorsFull = this.directors;
              this.directors.map( element => {
                if ( element.id === dataD[i].director.id) {
                  const film = {
                    id: dataD[i],
                    prix: dataD[i].prix,
                    title: dataD[i].title
                  };
                  element.films = [...element.films, film];
                }});
            }
            console.log(directorsFull);
            this.directors = directorsFull;
          });
      });
  }

  recupereActeurs() {
    this.spb.getAllActeurs().subscribe(
      data => {
        this.acteurs = data['_embedded']['actors'];
        console.log(this.acteurs);
        this.acteurs.map( elmt => {
          console.log(elmt);
          this.spb.getActeurs(elmt).subscribe(
            res => {
              const films = res;
              elmt.films = films;
            }
          ),
          error => console.log('Erreur, de récupération getActeurs')
        });

      },
      error => console.log('Erreur, de recuperation getAllActeursFull')
    )
  }

}
