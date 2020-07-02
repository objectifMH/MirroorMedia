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
  formFilmEdit: FormGroup;


  films: any;
  isEdtFilm = false;
  edtFilm;

  isAddFilm = false;

  constructor(private spb: SpbService, private fb: FormBuilder, private fb1: FormBuilder) {
    this.formEdit = this.fb.group({
      roleControl: ['USER']
    });

    this.formFilmEdit = this.fb1.group({
      filmId: [''],
      filmTitle: [''],
      filmDirector: [''],
      //filmActors: [''],
      filmDate: [''],
      filmPrix: ['']

    });


  }

  ngOnInit(): void {
    this.roles = this.spb.getRoles();
    this.init();
  }

  init() {

    this.recupereUsers();
    this.recupereFilms();
    this.recupereDirectors();
    this.recupereActeurs();
  }

  /******* User  */
  recupereUsers() {
    this.spb.getUsers().subscribe(
      data => {
        this.users = data;

        if (this.users) {
          const newUsers = this.users.map(element => {
            let totalTrue = 0;
            if (element.carts) {
              totalTrue = element.carts.filter(el => el.inCart === true).length;
              console.log(totalTrue);
            }
            element.totalTrue = totalTrue;
          });
        }
        console.log(this.users);
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

  deleteFilmUser(user, cart) {
    console.log(cart);
    if (confirm('Etes-vous sur de vouloir supprimer ce film,  "' + cart.title + '" !')) {
      cart.inCart = false;
      this.spb.setUsers(this.users);
      this.spb.setCarts(user.carts);
    }
    this.recupereUsers();
  }


  /******* Films  */
  recupereFilms() {
    this.spb.getAllMoviesFull().subscribe(
      data => {
        this.films = data;
        console.log(this.films);

      }
    )
  }

  deletefilm(film) {
    if (confirm('Etes-vous sur de vouloir supprimer ce film, ' + film.title + ' !')) {
      this.spb.deleteFilm(film).subscribe(
        data => {
          this.init();
        }
      )
    }
  }

  editFilm(film) {

    console.log("edit film 142 ", film, film.director);
    this.formFilmEdit = this.fb1.group({
      filmId: [film.id],
      filmTitle: [film.title],
      //filmDirector: [film.director.id +" : " +film.director.name],
      //filmActors: [film.actors],
      filmDirector: [film.director.id],
      filmDate: [film.date],
      filmPrix: [film.prix]
    });

    console.log("edit film 152", this.formFilmEdit.value, film.director.id + " : " + film.director.name);


    this.isEdtFilm = !this.isEdtFilm;
    this.edtFilm = film;
    console.log(this.isEdtFilm, film);

  }

  valideEditFilm(film) {

    console.log(" 163 >> validate :  debut validate ", film, this.formFilmEdit.value);
    /* this.formEdit.value
    filmId: [''],
      filmTitle: [''],
      filmDirector: [''],
      //filmActors: [''],
      filmDate: [''],
      filmPrix: [''] */

    film.id = this.formFilmEdit.value.filmId;
    film.title = this.formFilmEdit.value.filmTitle;
    film.date = this.formFilmEdit.value.filmDate;
    film.prix = this.formFilmEdit.value.filmPrix;
    let newDirector = this.directors.filter(dir => dir.id === parseInt(this.formFilmEdit.value.filmDirector));
    console.log(" 177 >>> newDirector ", newDirector);
    film.director = { id: newDirector[0].id, name: newDirector[0].name };

    console.log("notre nouveau film : ", film);

    if (confirm('Etes-vous sur de vouloir valider les attributs de ce film,  "' + this.formEdit.value.filmTitle + '" !')) {


      this.isEdtFilm = !this.isEdtFilm;
      this.edtFilm = film;
      console.log(" avant service ", film);
      this.spb.editFilm(film).subscribe(
        data => {
          console.log(data);
        }
      )

    }
    //this.init();
  }

  addFilm() {
    this.isAddFilm = true;
    console.log("On va ajouter  un film ");
  }

  valideAddFilm() {


    let film = {
      title: this.formFilmEdit.value.filmTitle, date: this.formFilmEdit.value.filmDate, prix: this.formFilmEdit.value.filmPrix,
      director: "/directors/" + this.formFilmEdit.value.filmDirector
    };

    console.log(this.formFilmEdit.value.filmTitle);

    console.log(" validation de l'ajout", film);
    if (confirm('Etes-vous sur de vouloir ajouter ce film, ' + film.title + ' !')) {
      this.spb.addFilm(film).subscribe(
        data => {
          this.init();
        },
        error => { console.log("Erreur, addFilm", film) },
        () => { this.isAddFilm = false; }
      )
    }
  }

  cancelFilm() {
    if (confirm('Etes-vous sur de vouloir abandonner l"ajout de ce film !')) {
      this.isAddFilm = false;
    }
  }

  /******* Director  */
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
              this.directors.map(element => {
                if (element.id === dataD[i].director.id) {
                  const film = {
                    id: dataD[i],
                    prix: dataD[i].prix,
                    title: dataD[i].title
                  };
                  element.films = [...element.films, film];
                }
              });
            }
            console.log(directorsFull);
            this.directors = directorsFull;
          });
      });
  }


  /******* Actor  */
  recupereActeurs() {
    this.spb.getAllActeurs().subscribe(
      data => {
        this.acteurs = data['_embedded']['actors'];
        //console.log(this.acteurs);
        this.acteurs.map(elmt => {
          //console.log(elmt);
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
