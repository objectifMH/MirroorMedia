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


  filmsSansCovers: any = [];
  films: any = [];
  filmslStorage: any = [];
  filmSpb: any = [];
  urlBaseImage: any;
  errorConnexSpb: any;
  cart = { quantity: 0, total: 0 };
  cartAvalide = { quantity: 0, total: 0 };
  nbrListTrue;

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

  getAllMovies() {

    this.spb.getAllMovies().subscribe(
      result => {

        // Tous les films SPB Api :
        this.filmSpb = result['_embedded']['movies'];
        let filmsAux = [];
        let inList = false;
        if (this.filmslStorage.length > 0) {
          this.filmSpb.map(spb => {
            inList = false;
            for (let lstorage of this.filmslStorage) {
              if (spb.id === lstorage.id) {
                filmsAux = [...filmsAux, { date: spb.date, id: spb.id, prix: spb.prix, title: spb.title, inCart: lstorage.inCart }];
                inList = true;
              }
            }
            if (!inList) {
              filmsAux = [...filmsAux, { date: spb.date, id: spb.id, prix: spb.prix, title: spb.title, inCart: false }];
            }

          });
        }
        else {
          // Pas de localStorage : 
          for (let spb of this.filmSpb) {
            filmsAux = [...filmsAux, { date: spb.date, id: spb.id, prix: spb.prix, title: spb.title, inCart: false }];
          }
        }
        this.filmsSansCovers = filmsAux;

        // On va recuperer les covers :
        this.getAllMoviesWithCovers(this.filmsSansCovers);

        // pas d'erreur de connexion :
        this.errorConnexSpb = '';

      }
      ,
      error => {
        console.log('Une erreur est survenue, On arrive pas à charger les films de la spb bd', error);
        this.errorConnexSpb = 'Spring Boot Lks Movies database connection error';
      }
    );
  }

  addCart(film) {
    film.inCart = !film.inCart;

    for (let f of this.filmsSansCovers) {
      if (f.id === film.id) {
        f.inCart = film.inCart;
      }
    }
    this.cartAvalide.quantity = this.films.filter(film => film.inCart === true).length;
    let tot = this.films.filter(film => film.inCart === true).reduce((acc, film) => acc + film.prix, 0);
    this.cartAvalide.total = parseFloat(tot.toFixed(2));
  }

  totalCarts() {
    let tot = 0;
    let compt = 0;
    if (this.films) {
      this.films.filter(film => film.inCart === true).map(film => {
        compt++;
        tot = film.prix + tot;
      });
    }
    this.cart = {
      quantity: compt,
      // tslint:disable-next-line:radix
      total: parseFloat(tot.toFixed(2))
    };
    this.cartAvalide.quantity = compt;
    this.cartAvalide.total = parseFloat(tot.toFixed(2));
    this.spb.setCart(this.cart);
    this.article = compt > 0 ? 'articles' : 'article';
  }


  recupereCarts() {
    this.spb.getCarts().subscribe(
      data => {
        if (data) {
          this.filmslStorage = data;
          //console.log("local storage >> ", data);
        }
        this.getAllMovies();
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
          //console.log('je suis dans sp et pas authenthifié', this.userAuth)
          this.router.navigate(['/home']);
        } else {
          //console.log('Connecté et authenthifié', this.userAuth);
          this.recupereCarts();
        }
      },
      error => console.log('erreur pour récuperer si on est authentifié')
    );
  }


  getAllMoviesWithCovers(filmsAux) {
    //console.log(" !!!!!!!!!!!!!!!!!!!!!!!  debut films covers !!!!!!!!!!!!!!!!!!!!!!!");
    console.log(" 186, spb  this films >> ", this.films, filmsAux);

    // On récupère les covers tmdb Api :

    // on parcours notre liste mixte entre  local storage et api : 
    const filmsWCover = filmsAux.sort().map(film => {

      // On fait une recherche pour chaque film de la liste : 
      this.tmdb.search(film.title).subscribe(

        resCovers => {

          if (resCovers['results'].length) {

            // Pour chaque film, on cherche sa cover dans tmdb : 
            // si le film qu on recherche n'est pas present dans notre  liste this.films : 
            if (this.films.filter(f => f.id === film.id).length < 1) {
              this.films =
                [...this.films, { filmdb: resCovers['results'][0], title: film.title, id: film.id, prix: film.prix, inCart: film.inCart }];
            }
            else {
              this.films.map(filmListe => {
                if (filmListe.id === film.id) {
                  filmListe['filmdb'] = resCovers['results'][0];
                  filmListe['title'] = film.title;
                  filmListe['prix'] = film.prix;
                  filmListe['inCart'] = film.inCart;
                }
              });
            }
          } 
          else {

            if (this.films.filter(f => f.id === film.id).length < 1) {
              this.films =
                [...this.films, { filmdb: { title: film.title, poster_path: undefined }, title: film.title, id: film.id, prix: film.prix, inCart: film.inCart }];
            }
            else {
              this.films.map(filmListe => {
                if (filmListe.id === film.id) {
                  filmListe['filmdb'] = { title: film.title, poster_path: undefined };
                  filmListe['title'] = film.title;
                  filmListe['prix'] = film.prix;
                  filmListe['inCart'] = film.inCart;

                }
              });
            }

          }

          this.totalCarts();

        },
        error => { console.log('erreur recuperation search ' + film.title); },
        // Complete de search film.title 
        () => {
          console.log(" complete " + film.title, this.films); this.totalCarts();
        }

      )

    });
  }

  validateList() {
    if (confirm('Are you sure you want to validate your list ?')) {
      //console.log("231, on valide la liste sans covers ", this.filmsSansCovers)
      this.spb.setCarts(this.filmsSansCovers);
    }
  }

}
