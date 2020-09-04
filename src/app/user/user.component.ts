import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';
import { Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  theme;

  userAuth;
  films = [];
  filmsCovers = [];
  urlBaseImage = '';

  constructor(private spb: SpbService, private router: Router, private tmdb: TmdbService, private inout: InOutService) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();
  }

  ngOnInit(): void {
    this.recupereAuth();
    this.getTheme();
  }

  getTheme() {
    this.inout.getTheme().subscribe(
      data => {
        this.theme = data;
      },
      error => console.log("Erreur, brightness")
    )
  }


  recupereAuth() {
    this.spb.getUserAuthenticated().subscribe(
      rep => {
        this.userAuth = rep;
        if (this.userAuth.carts) {
          this.films = rep.carts.filter(film => film.inCart === true);
          this.recupereCovers();
        } else {
          this.recupereCarts();
        }


        console.log('recupere auth dans spb', this.userAuth.pseudo);
        if (this.userAuth.pseudo === null) {

          // Si l'utilisateur n'est pas connecté on est renvoyé vers la home :
          this.router.navigate(['/home']);
        }
      },
      error => console.log('erreur pour récuperer si on est authentifié')
    );
  }

  recupereCarts() {
    this.spb.getCarts().subscribe(
      data => {
        if (data) {
          this.films = data.filter(film => film.inCart === true);
        }
        this.recupereCovers();
        console.log(data, this.films);
      },
      error => {
        return console.log('Erreur, récupération recupereCarts dans user.ts');
      });
  }

  recupereCovers() {
    this.films.map(
      film => {
        this.tmdb.search(film.title).subscribe(
          resCovers => {
            if ( resCovers['results'].length > 0)
            {
              this.filmsCovers = [...this.filmsCovers, {filmdb: resCovers['results'][0], title: film.title, id: film.id, prix: film.prix, inCart: film.inCart }];
            }
            else {
              this.filmsCovers = [...this.filmsCovers, {filmdb: {title: film.title, poster_path:undefined}, title: film.title, id: film.id, prix: film.prix, inCart: film.inCart }];
            }
          })
          //console.log(this.filmsCovers);
      })
  }

}