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


  // liste des films de spb api + covers apres un search dans tmdb API 
  getAllMovies() {

    this.spb.getAllMovies().subscribe(
      result => {

        // Tous les films SPB Api :
        this.filmSpb = result['_embedded']['movies'];   //.slice(0,3);
        //console.log(this.filmSpb);
        let inStorage = false;
        let filmsAux = [];

        // Si il y a une liste dans  le local storage pour notre utilisateur : 
        if (this.filmslStorage.length > 0) {

          // Parcours de la liste SPB api : 
          this.filmSpb.map(spb => {

            // spb est un film de l'api Spb :
            //console.log(' >>>  69' , spb);

            // On parcours la liste des films dans le local storage :
            for (const local of this.filmslStorage) {

              // Si le film dans le local storage est égal au film spb api 
              // Si le film dans le local  storage se trouve dans l'api 
              if (local.iddb === spb.id) {

                //console.log(local)
                filmsAux = [...filmsAux, { filmdb: local.filmdb, title: spb.title, iddb: spb.id, prixdb: spb.prix, inCart: local.inCart }];
                inStorage = true;

              }

            }
            // si le film dans le loacal storage n'est pas dans l'api 
            if (inStorage === false) {
              //console.log(spb)
              filmsAux = [...filmsAux, spb];

            }
            inStorage = false;

          });

        } else {
          // Si c'est un nouvel utilisateur et par conséquend pas de liste dans le local storage :
          // Notre liste est égal à la liste SPB api :

          console.log(" nouvel utilisateur donc pas de local storage");
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
    //this.spb.setCarts(this.films);
    this.cartAvalide.quantity = this.films.filter(film => film.inCart === true).length;
    let tot = this.films.filter(film => film.inCart === true).reduce((acc, film)=> acc + film.prixdb, 0);
    this.cartAvalide.total = parseFloat(tot.toFixed(2));
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
    //console.log(this.cart);
    this.cartAvalide.quantity = compt; 
    this.cartAvalide.total = parseFloat(tot.toFixed(2)) ; 
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
    console.log(" !!!!!!!!!!!!!!!!!!!!!!!  debut films covers !!!!!!!!!!!!!!!!!!!!!!!");
    console.log(" this films >> ", this.films , filmsAux);

    // On récupère les covers tmdb Api :

    // on parcours notre liste mixte entre  local storage et api : 
    const filmsWCover = filmsAux.sort().map(film => {
      
      console.log("206, film de la liste mixte --- : ", film);
      // On fait une recherche pour chaque film de la liste : 
      this.tmdb.search(film.title).subscribe(

        resCovers => {
          // Pour chaque film, on cherche sa cover dans tmdb : 
          // si le film qu on recherche n'est pas present dans notre  liste this.films : 
          if (  this.films.filter( f => f.iddb === film.iddb).length < 1 )
          {
            
            console.log(film.title, film , this.films);
            // si ce film vient de l'api  et pas du local storage donc il a  pas encore de filmdb : 
            if (!film.filmdb) {

              this.films =
                [...this.films, { filmdb: resCovers['results'][0], title: film.title, iddb: film.id, prixdb: film.prix, inCart: film.inCart }];
              console.log(" 220, le film  est pas dans le  local storage : ", film , this.films)
            } else {
              // le film était déja present dans le  local storage : 
              this.films =
                [...this.films, { filmdb: resCovers['results'][0], title: film.title, iddb: film.iddb, prixdb: film.prixdb, inCart: film.inCart }];
                console.log(" 224, le film  est dans le  local storage : ", film , this.films)
            }
          }
          else {
            // Notre liste this.films est vierge c'est la premiere fois qu'on passe ici : 
            /* console.log("dans le elseeee; Notre liste this.films est vierge " , this.films);
            this.films.map( f => {
              if ( f.iddb === film.iddb)
              {
                console.log("Notre liste this.films est vierge", f, film)
                f.title = film.title;
                f.iddb = film.iddb;
                f.prixdb = film.prixdb;
                f.inCart =  film.inCart;
              }
            }); */
          }
         
          
          //console.log('>>>>>>>>>>>>> on va calculer total carts');
          this.totalCarts();
          //console.log('>>>>>>>>>>>>>>> stop  calculer total carts');

        }

      );

    });

    console.log(" this film >> ", this.films , filmsAux);
    console.log(" $$$$$$$$$$$$$$$$$$$$$$$$  FINNN films covers $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  }

  validateList(){
    if (confirm('Etes-vous sur de vouloir valider votre liste !')) {
    this.spb.setCarts(this.films);
    }
  }

}
