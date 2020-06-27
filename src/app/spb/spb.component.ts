import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpbService } from '../services/spb.service';
import { TmdbService } from '../services/tmdb.service';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import { InOutService } from '../services/in-out.service';

@Component({
  selector: 'app-spb',
  templateUrl: './spb.component.html',
  styleUrls: ['./spb.component.scss']
})
export class SpbComponent implements OnInit {


  films: any = [];
  filmslStorage: any = [];
  filmSpb: any = [];
  urlBaseImage: any;
  errorConnexSpb: any;
  cart = { quantity: 0, total: 0 };

  carts: any = [];
  article = 'article';

  isFade = false;

  auth = false;
  userAuth;

  usersStorage;

  constructor(private route: ActivatedRoute, private router: Router, private spb: SpbService,
              private tmdb: TmdbService) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();
    this.isFadeShow();

  }

  ngOnInit() {
    this.recupereAuth();

  }


  // liste des films de spb api + covers apres un search dans tmdb API 
  getAllMovies() {

    this.films = [];

    this.spb.getAllMovies().subscribe(
      result => {

        // Tous les films SPB Api :
        this.filmSpb = result['_embedded']['movies'];   //.slice(0,3);
        console.log(this.filmSpb);
        let inStorage = false;
        let filmsAux = [];

        if (this.filmslStorage.length > 0) {
          this.filmSpb.map(spb => {
            for (const local of this.filmslStorage) {
              if (local.iddb === spb.id) {
                filmsAux = [...filmsAux, local];
                inStorage = true;
              }
            }

            if (inStorage === false) {
              filmsAux = [...filmsAux, spb];

            }
            inStorage = false;

          });

        } else {
          filmsAux = this.filmSpb;
        }


        console.log(" >>>> this.films >>>> : ", filmsAux);

        //this.recupereCarts();
        this.getAllMoviesWithCovers(filmsAux);
        this.errorConnexSpb = '';

      }
      ,
      error => {
        console.log('Une erreur est survenue, On arrive pas à charger les films de la spb bd', error);
        this.errorConnexSpb = 'Erreur de connexion à la base de donnée Spring Boot Lks Movies';
      }
    );
  }

  addCart(film) {
    film.inCart = !film.inCart;
    this.spb.setCarts(this.films);

  }

  totalCarts() {
    let tot = 0;
    let compt = 0;

    if (this.films) {
      this.films.filter(film => film.inCart === true).map(film => {
        compt++;
        tot = film.prixdb + tot;
      });
    }
    this.cart = {
      quantity: compt,
      // tslint:disable-next-line:radix
      total: parseFloat(tot.toFixed(2))
    };
    console.log(this.cart);
    this.spb.setCart(this.cart);
    this.article = compt > 0 ? 'articles' : 'article';
  }


  recupereCarts() {
    this.spb.getCarts().subscribe(
      data => {
        if (data) {

          this.filmslStorage = data;

          console.log("local storage >> ", data);

        }

        console.log("local Storage : ", this.filmslStorage);
        console.log("spb api : ", this.films);

        this.getAllMovies();

        //this.totalCarts();

      },
      err => {
        console.log('erreur observable dans spb.coments', err);
      }
    );
  }

  isFadeShow() {
    setTimeout(() => {
      this.isFade = true;
    }, 10000);
  }

  recupereAuth() {
    this.spb.getUserAuthenticated().subscribe(
      rep => {
        this.userAuth = rep;
        if (this.userAuth.pseudo === null) {

          // Si l'utilisateur n'est pas connecté on est renvoyé vers la home :
          console.log('je suis dans sp et pas authenthifié', this.userAuth)
          this.router.navigate(['/home']);
        } else {
          console.log('Connecté et authenthifié', this.userAuth);
          this.recupereCarts();
        }
      },
      error => console.log('erreur pour récuperer si on est authentifié')
    );
  }


  getAllMoviesWithCovers(filmsAux) {

    // On récupère les covers tmdb Api :
    const filmsWCover = filmsAux.sort().map(film => {

      this.tmdb.search(film.title).subscribe(

        resCovers => {

          if (!film.filmdb) {
            this.films =
              [...this.films, { filmdb: resCovers['results'][0], title: film.title, iddb: film.id, prixdb: film.prix, inCart: false }];
            console.log(' >>> ', this.films);
          } else {
            this.films =
              [...this.films, { filmdb: film.filmdb, title: film.title, iddb: film.iddb, prixdb: film.prixdb, inCart: film.inCart }];
            console.log(' >>> ', this.films);
          }
        }

      );

    });
    this.totalCarts();
  }

}
