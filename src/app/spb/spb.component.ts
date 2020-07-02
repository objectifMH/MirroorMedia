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
        let inList = false ; 
        if (this.filmslStorage.length > 0) {
          console.log('59, Dans film storage ', this.filmslStorage);
          this.filmSpb.map(spb => {
            inList = false;
            for (let lstorage of this.filmslStorage) {
              if (spb.id === lstorage.id) {
                //console.log(spb);
                filmsAux = [...filmsAux, { date: spb.date, id: spb.id, prix: spb.prix, title: spb.title, inCart: lstorage.inCart }];
                inList = true;
              }
             
            }
            if ( !inList)
            {
              filmsAux = [...filmsAux, { date: spb.date, id: spb.id, prix: spb.prix, title: spb.title, inCart: false }];
            }

          });
        }
        else {
          // Pas de localStorage : 
          for (let spb of this.filmSpb) {
            //console.log("74 >> >>" , spb);
            filmsAux = [...filmsAux, { date: spb.date, id: spb.id, prix: spb.prix, title: spb.title, inCart: false }];

          }
        }
        //console.log('69 >>> La liste sans covers : ', filmsAux);
        this.filmsSansCovers = filmsAux;

        // On va recuperer les covers :
        this.getAllMoviesWithCovers(this.filmsSansCovers);

        // pas d'erreur de connexion :
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
    //this.spb.setCarts(this.films);

    for (let f of this.filmsSansCovers) {
      //console.log('105 >>>> ', f,film,  this.filmsSansCovers);
      if (f.id === film.id) {
        f.inCart = film.inCart;
        //console.log('109 >>>> ', f, film,  this.filmsSansCovers);
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
    //console.log(this.cart);
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

        //console.log("local Storage : ", this.filmslStorage);
        console.log(" 152 >>>>>>>>>>>>>>>>>>>>>>      recupereCarts spb api : ", this.films);

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

      //console.log("206, film de la liste mixte --- : ", film);
      // On fait une recherche pour chaque film de la liste : 
      this.tmdb.search(film.title).subscribe(

        resCovers => {
          // Pour chaque film, on cherche sa cover dans tmdb : 
          // si le film qu on recherche n'est pas present dans notre  liste this.films : 
          if (this.films.filter(f => f.id === film.id).length < 1) {

            console.log(" 202 >>> pas present " , film.title, film, this.films);
            // si ce film vient de l'api  et pas du local storage donc il a  pas encore de filmdb : 
            if (!film.filmdb) {

              this.films =
                [...this.films, { filmdb: resCovers['results'][0], title: film.title, id: film.id, prix: film.prix, inCart: film.inCart }];
              //console.log(" 215, le film  est pas dans le  local storage : ", film , this.films)
            } else {
              // le film était déja present dans le  local storage : 
              this.films =
                [...this.films, { filmdb: resCovers['results'][0], title: film.title, id: film.id, prix: film.prix, inCart: film.inCart }];
              //console.log(" 220, le film  est dans le  local storage : ", film , this.films)
            }
          }
          else {
            console.log(" film est present dans la liste ", film, this.films);
            this.films.map(filmListe => {
                if (filmListe.id === film.id) {
                  filmListe['filmdb'] = resCovers['results'][0];
                  filmListe['title'] =  film.title;
                  filmListe['prix'] =  film.prix;
                  filmListe['inCart'] =  film.inCart;

                }
              });

              console.log("228 >>>> ", this.films);
          
          }


          //console.log('>>>>>>>>>>>>> on va calculer total carts');
          this.totalCarts();
          //console.log('>>>>>>>>>>>>>>> stop  calculer total carts');

        },
        error => { console.log('erreur recuperation search ' + film.title); },
        // Complete de search film.title 
        () => { console.log(" complete " + film.title, this.films); this.totalCarts(); }

      )

    });

    console.log(" 235 this film >> ", this.films, filmsAux);
    //console.log(" $$$$$$$$$$$$$$$$$$$$$$$$  FINNN films covers $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  }

  validateList() {
    if (confirm('Etes-vous sur de vouloir valider votre liste !')) {
      //console.log("231, on valide la liste sans covers ", this.filmsSansCovers)
      this.spb.setCarts(this.filmsSansCovers);
    }
  }

}
