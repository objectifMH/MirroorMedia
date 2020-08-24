import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';
import { FormGroup, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  theme;

  users;
  isEdtUser = false;
  edtUser;
  roles;
  directors;
  acteurs = [];
  selectedActorsValues = [];

  formEdit: FormGroup;
  formFilmEdit: FormGroup;
  formDirectorEdit: FormGroup;
  formActorEdit: FormGroup;


  films: any;
  isEdtFilm = false;
  edtFilm;
  isAddFilm = false;

  actorsData = [];

  isEdtDirector = false;
  edtDirector;
  isAddDirector = false;

  isEdtActor = false;
  edtActor;
  isAddActor = false;
  actorOptions: any;


  constructor(private inout: InOutService, private spb: SpbService, private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private fb3: FormBuilder,
    private toastr: ToastrService) {
    this.formEdit = this.fb.group({
      roleControl: ['USER']
    });

    this.formFilmEdit = this.fb1.group({
      filmId: [''],
      filmTitle: ['', [Validators.required]],
      filmDirector: ['', [Validators.required]],
      filmActors: this.addActorsControl(),
      filmDate: ['', [Validators.required]],
      filmPrix: ['', [Validators.required]]

    });



    this.formDirectorEdit = this.fb2.group({
      directorId: [''],
      directorName: ['', [Validators.required]]
    });

    this.formActorEdit = this.fb3.group({
      actorId: [''],
      actorName: ['', [Validators.required]]
    });


  }

  ngOnInit(): void {
    this.roles = this.spb.getRoles();
    this.init();
    this.getTheme();
  }

  init() {

    this.recupereUsers();
    this.recupereFilms();
    this.recupereDirectors();
    this.recupereActeurs();
  }

  addActorsControl() {
    const arr = this.actorsData.map(elm => {
      return this.fb1.control(false);
    })
    return this.fb1.array(arr);
  }

  addActorsEditControl(film) {
    console.log(film);
    const arr = this.actorsData.map(elm => {
      for (let actor of film.actors) {
        if (actor.id === elm.id) {
          return this.fb1.control(true);
        }
      }
      return this.fb1.control(false);
    })
    return this.fb1.array(arr);
  }

  get actorsArray() {
    return <FormArray>this.formFilmEdit.get('filmActors');
  }

  getSelectedActorsValue() {
    this.selectedActorsValues = [];
    this.actorsArray.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedActorsValues.push(this.actorsData[i]);
      }
    })
    console.log(this.selectedActorsValues);
  }


  getTheme() {
    this.inout.getTheme().subscribe(
      data => {
        this.theme = data;
      },
      error => console.log("Erreur, brightness")
    )
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

            }
            element.totalTrue = totalTrue;
          });
        }
        //console.log(this.users);
      }
    );

  }

  deleteUser(user) {

    if (confirm('Are you sure you want to delete this user, ' + user.pseudo + ' !')) {
      this.spb.deteleUser(user);
      this.toastr.warning(user.pseudo + " are deleted !", "User", {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing'
      })
    }
    this.recupereUsers();
  }

  deleteEdit(user) {
    if (confirm('Are you sure you want to abandon this edit for, ' + user.pseudo + ' !')) {
      this.isEdtUser = !this.isEdtUser;
    }
  }

  editUser(user) {
    this.formEdit = this.fb.group({
      roleControl: [user.role]
    });

    this.isEdtUser = !this.isEdtUser;
    this.edtUser = user;
  }

  validRoleUser(user) {
    if (confirm('Are you sure you want to edited this user,  "' + this.formEdit.value.roleControl + '" !')) {

      this.isEdtUser = !this.isEdtUser;
      this.spb.validRoleUser(user, this.formEdit.value);
      this.toastr.success(user.pseudo + " are edited with sucess !", "User", {
        timeOut: 1000,
        progressBar: true,
        progressAnimation: 'increasing'
      })

    }
    this.recupereUsers();

  }

  deleteFilmUser(user, cart) {
    console.log(cart);
    if (confirm('Are You sure you want to delete this movie,  "' + cart.title + ' for : " ' + user.pseudo + ' !')) {
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
        //console.log(this.films);

      }
    )
  }

  deleteFilm(film) {
    console.log(" suppression de ce film ", film);
    if (confirm('You will delete this movie, ' + film.title + ' !')) {
      this.spb.deleteFilm(film).subscribe(
        data => {
          this.toastr.warning(film.title + " are delete with success !", "Movie", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })
          this.init();
        }
      )
    }
  }

  deleteEditFilm(film) {
    if (confirm('You will abandon the edit of this movie, ' + film.title + ' !')) {
      this.isEdtFilm = !this.isEdtFilm;
    }
  }

  editFilm(film) {

    console.log("edit film 142 ", film, film.director);
    this.formFilmEdit = this.fb1.group({
      filmId: [film.id],
      filmTitle: [film.title],
      filmActors: this.addActorsEditControl(film),
      filmDirector: [film.director.id],
      filmDate: [film.date],
      filmPrix: [film.prix]
    });

    console.log("edit film 152", this.formFilmEdit.value, film.director.id + " : " + film.director.name);


    this.isEdtFilm = !this.isEdtFilm;
    this.isAddFilm = false;
    this.edtFilm = film;
    console.log(this.isEdtFilm, film);

  }

  valideEditFilm(film) {

    film.id = this.formFilmEdit.value.filmId;
    film.title = this.formFilmEdit.value.filmTitle;
    film.date = this.formFilmEdit.value.filmDate;
    film.prix = this.formFilmEdit.value.filmPrix;
    let newDirector = this.directors.filter(dir => dir.id === parseInt(this.formFilmEdit.value.filmDirector));

    //director
    film.director = { id: newDirector[0].id, name: newDirector[0].name };
    //actors 
    let actors = [];
    for (let actor of this.selectedActorsValues) {
      actors = [...actors, "http://localhost:8088/actors/" + actor.id];
    }
    film.actors = actors;

    if (confirm('Are you sure you want validate,  "' + this.formFilmEdit.value.filmTitle + '" !')) {


      this.isEdtFilm = !this.isEdtFilm;
      this.edtFilm = film;
      //film.actors = this.selectedActorsValues;
      this.spb.editFilm(film).subscribe(
        data => {
          this.toastr.success(film.title + " are edit with success !", "Movie", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })

        },
        error => {
          this.toastr.error(film.title + " are not add !", "Movie", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })
        },
        () => {
          console.log(" complete ", film);
          // Mise à zéro des champs :
          this.formFilmEdit = this.fb1.group({
            filmId: [''],
            filmTitle: [''],
            filmDirector: [''],
            filmActors: this.addActorsControl(),
            filmDate: [''],
            filmPrix: ['']

          });
          this.init();
        }
      )

    }
  }

  addFilm() {
    this.isAddFilm = !this.isAddFilm;
    this.isEdtFilm = false;
    console.log("On va ajouter  un film ");
    // complete on remet les champs à zéro :
    this.formFilmEdit = this.fb1.group({
      filmId: [''],
      filmTitle: [''],
      filmDirector: [''],
      filmActors: this.addActorsControl(),
      filmDate: [''],
      filmPrix: ['']

    });
  }

  valideAddFilm() {

    console.log(" status du form ", this.formFilmEdit.status, this.formFilmEdit);

    let actors = [];
    for (let actor of this.selectedActorsValues) {
      actors = [...actors, "http://localhost:8088/actors/" + actor.id];
    }

    if (this.formFilmEdit.status === 'VALID') {
      let film = {
        title: this.formFilmEdit.value.filmTitle, date: this.formFilmEdit.value.filmDate, prix: this.formFilmEdit.value.filmPrix,
        director: "/directors/" + this.formFilmEdit.value.filmDirector,
        actors: actors
      };


      console.log(this.formFilmEdit.value.filmTitle);

      console.log(" validation de l'ajout", film);
      if (confirm('Are you sure you want to add this movie, ' + film.title + ' !')) {
        this.spb.addFilm(film).subscribe(
          data => {

            this.init();
            this.toastr.success(film.title + " are add !", "Movie", {
              timeOut: 1000,
              progressBar: true,
              progressAnimation: 'increasing'
            })
          },
          error => {
            console.log("Erreur, addFilm", film);
            this.toastr.error(film.title + " are not add with success !", "Movie", {
              timeOut: 1000,
              progressBar: true,
              progressAnimation: 'increasing'
            })
          },
          () => {
            this.isAddFilm = false;

            // complete on remet les champs à zéro :
            this.formFilmEdit = this.fb1.group({
              filmId: [''],
              filmTitle: [''],
              filmDirector: [''],
              filmActors: this.addActorsControl(),
              filmDate: [''],
              filmPrix: ['']

            });
          }
        )
      }
    }
    else {
      this.formFilmEdit.markAllAsTouched();
      alert(" All fields are not completed ! ");
    }

  }

  deleteActorForFilm(film, actor) {
    if (confirm('Are you sure you want to delete this actor : ' + actor.name + ' from this movie : ' + film.title + ' !')) {
      console.log(film, actor);

      //actors 
      let actors = [];
      for (let act of film.actors) {
        if (act.id !== actor.id)
          actors = [...actors, "http://localhost:8088/actors/" + act.id];
      }

      film.actors = actors;
      console.log(film);

      this.spb.editFilm(film).subscribe(
        data => {
          this.toastr.success(actor.name + " are deleted for " + film.title + "  with success !", "Movie", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })

        },
        error => {
          this.toastr.error(actor.name + " are not deleted !", "Movie", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })
        },
        () => {
          
          this.recupereFilms();
          this.recupereActeurs();
        }
      )



    }
  }

  cancelFilm() {
    if (confirm('Are you sure you want to discontinue adding this movie ?')) {
      this.isAddFilm = false;
    }
  }

  /******* Director  */
  recupereDirectors() {
    this.spb.getAllDirectors().subscribe(
      data => {
        this.directors = data['_embedded']['directors'];
        this.directors.map(di => di.films = []);
        //console.log(this.directors);
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
            //console.log(directorsFull);
            this.directors = directorsFull;
          });
      });
  }

  deleteDirector(director) {
    if (confirm('Are you sure you want to delete this director : ' + director.name + ' !')) {
      this.spb.deleteDirector(director).subscribe(
        data => {
          this.init();
          this.toastr.info(director.name + " are delete with success !", "Director", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing'
          })
        },
        error => {
          console.log(error, error.status)
          if (error.status === 409) {
            alert('To delete this director you must delete all movies of : ' + director.name);
          }
        }
      )
    }
  }

  deleteEditDirector(director) {
    if (confirm('You will abandon the delete of this director, ' + director.name + ' !')) {
      this.isEdtDirector = !this.isEdtDirector;
    }
  }

  editDirector(director) {

    this.formDirectorEdit = this.fb2.group({
      directorId: [''],
      directorName: [director.name]
    });


    this.isEdtDirector = !this.isEdtDirector;
    this.isAddDirector = false;

    this.edtDirector = director;

  }

  valideEditDirector(director) {

    console.log(" 342 >> validate :  debut validate ", director, this.formDirectorEdit.value);

    director.name = this.formDirectorEdit.value.directorName;


    console.log("notre nouveau film : ", director);

    if (confirm('Are you sure you want to validate the attributes of this film,  "' + this.formDirectorEdit.value.directorName + '" !')) {


      this.isEdtDirector = !this.isEdtDirector;
      this.edtDirector = director;
      console.log(" avant service director ", director);
      this.spb.editDirector(director).subscribe(
        data => {
          this.toastr.success(director.name + " are edited with success !", "Director", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })

          console.log("359 ac form ", this.formDirectorEdit)
        },
        error => {
          console.log("error for ", director);

          this.toastr.error(director.name + " are not add with success !", "Director", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })
        },
        () => {
          console.log(" complete ", director);
          // Mise à zéro des champs :
          this.formDirectorEdit = this.fb2.group({
            directorId: [''],
            directorName: ['', [Validators.required]]
          });
          this.init();
        }
      )

    }
    //this.init();
  }

  addDirector() {
    this.isAddDirector = !this.isAddDirector;
    this.isEdtDirector = false;

    // complete on remet les champs à zéro :
    this.formDirectorEdit = this.fb2.group({
      directorId: [''],
      directorName: ['']

    });
  }

  valideAddDirector() {

    if (this.formDirectorEdit.status === 'VALID') {
      let director = {
        name: this.formDirectorEdit.value.directorName
      };

      if (confirm('Are you sure you want to add this director, ' + director.name + ' !')) {
        this.spb.addDirector(director).subscribe(
          data => {
            this.toastr.success(director.name + " are add with success !", "Director", {
              timeOut: 1000,
              progressBar: true,
              progressAnimation: 'increasing'
            })
            this.init();
          },
          error => {
            console.log("Erreur, addDirector", director);
            this.toastr.error(director.name + " are not add with success !", "Director", {
              timeOut: 1000,
              progressBar: true,
              progressAnimation: 'increasing'
            })
          },
          () => {
            this.isAddDirector = false;

            // complete on remet les champs à zéro :
            this.formDirectorEdit = this.fb2.group({
              directorId: [''],
              directorName: ['']

            });
          }
        )
      }
    }
    else {
      this.formFilmEdit.markAllAsTouched();
      alert(" All fields are not completed! ");
    }

  }

  cancelDirector() {
    if (confirm('Are you sure you want to abandon adding this Director? !')) {
      this.isAddDirector = false;
    }
  }


  /******* Actor  */
  recupereActeurs() {
    this.spb.getAllActeurs().subscribe(
      data => {
        this.acteurs = data['_embedded']['actors'];
        this.actorsData = data['_embedded']['actors'];


        this.formFilmEdit = this.fb1.group({
          filmId: [''],
          filmTitle: ['', [Validators.required]],
          filmDirector: ['', [Validators.required]],
          filmActors: this.addActorsControl(),
          filmDate: ['', [Validators.required]],
          filmPrix: ['', [Validators.required]]

        });
        this.acteurs.map(elmt => {
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

  deleteEditActor(actor) {
    if (confirm('You will abandon the delete of this actor, ' + actor.name + ' !')) {
      this.isEdtActor = !this.isEdtActor;
    }
  }

  deleteActor(actor) {
    if (confirm('Are you sure you wand ton delete, ' + actor.name + ' !')) {
      this.spb.deleteActor(actor).subscribe(
        data => {
          this.init();
          this.toastr.info(actor.name + " are delete with success !", "Actor", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing'
          })
        },
        error => {
          console.log(error, error.status)
          if (error.status === 409) {
            alert('Before delete : ' + actor.name + ', you must delete all his movies !');
          }
        }
      )
    }
  }

  addActor() {
    this.isAddActor = !this.isAddActor;
    this.isEdtActor = false;

    // Mise à zéro des champs :
    this.formActorEdit = this.fb3.group({
      actorId: [''],
      actorName: ['', [Validators.required]]
    });
  }

  valideAddActor() {

    console.log(" status du form ", this.formActorEdit.status)
    if (this.formActorEdit.status === 'VALID') {
      let actor = {
        name: this.formActorEdit.value.actorName
      };

      console.log(this.formActorEdit.value.actorName);

      console.log(" validation de l'ajout", actor);
      if (confirm('Are you sure you want to add this Actor, ' + actor.name + ' !')) {
        this.spb.addActor(actor).subscribe(
          data => {
            this.toastr.success(actor.name + " are add with success !", "Actor", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing'
            })
            this.init();
          },
          error => {
            console.log("Erreur, addActor", actor);
            this.toastr.error(actor.name + " are not add with success !", "Actor", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing'
            })
          },
          () => {
            this.isAddActor = false;

            // complete on remet les champs à zéro :
            this.formActorEdit = this.fb3.group({
              actorId: [''],
              actorName: ['']

            });
          }
        )
      }
    }
    else {
      this.formFilmEdit.markAllAsTouched();
      alert(" Not all fields are completed! ");
    }

  }

  cancelActor() {
    if (confirm('Are you sure you want to abandon the add of this Actor !')) {
      this.isAddActor = false;
    }
  }

  editActor(actor) {

    this.formActorEdit = this.fb3.group({
      actorId: [''],
      actorName: [actor.name]
    });

    this.isEdtActor = !this.isEdtActor;
    this.isAddActor = false;
    this.edtActor = actor;

  }

  valideEditActor(actor) {


    actor.name = this.formActorEdit.value.actorName;

    if (confirm('Are you sure you want to edit this ,  "' + this.formActorEdit.value.actorName + '" !')) {


      this.isEdtActor = !this.isEdtActor;
      this.edtActor = actor;
      this.spb.editActor(actor).subscribe(
        data => {
          this.toastr.success(actor.name + " are edited with success !", "Actor", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing'
          })

        },
        error => {

          this.toastr.error(actor.name + " are not add with success !", "Actor", {
            timeOut: 1000,
            progressBar: true,
            progressAnimation: 'increasing'
          })
        },
        () => {

          // Mise à zéro des champs :
          this.formActorEdit = this.fb3.group({
            actorId: [''],
            actorName: ['', [Validators.required]]
          });
          this.init();
        }
      )

    }
  }



}
