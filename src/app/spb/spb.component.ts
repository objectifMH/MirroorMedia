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
  covers: any = [];
  urlBaseImage: any;
  errorConSpb: any;
  cart = { quantity: 0, total: 0 };

  carts: any = [];
  article = 'article';

  isFade: boolean = false;

  auth = false;
  userAuth;

  usersStorage;

  constructor(private route: ActivatedRoute, private router: Router, private spb: SpbService,
    private tmdb: TmdbService, private inout: InOutService) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();
    this.isFadeShow();

  }

  ngOnInit() {
    this.recupereAuth();
    this.recupereCarts();
  }

  getAllMovies() {
    this.spb.getAllMovies().subscribe(
      result => {

        this.covers = result['_embedded']['movies'] ;// .slice(0,3);
        let filmsWCover = this.covers.map(film => {
          this.tmdb.search(film.title).subscribe(
            resCovers => {
              this.films = [...this.films, { filmdb: resCovers['results'][0], iddb: film.id, prixdb: film.prix, inCart: false }];
            }
          )
        });
        this.errorConSpb = '';
      }
      ,
      error => {
        console.log('Une erreur est survenue, On arrive pas à charger les films de la spb bd', error);
        this.errorConSpb = "Erreur de connexion à la base de donnée Spring Boot Lks Movies";
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

    if (this.films)
      this.films.filter(film => film.inCart === true).map(film => {
        compt++;
        tot = film.prixdb + tot;
      });
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
      console.log("RecupereCarts >>> debut");
      this.spb.getCarts().subscribe(
      data => {
        console.log("RecupereCarts >>> data : ", data);
        if (data) {

          console.log("RecupereCarts >>> data ", data);
          this.films = data;
          this.covers = data;
          this.totalCarts();
        }
        else {
          this.getAllMovies();
        }
      },
      err => {
        console.log('erreur observable dans spb.coments', err);
      }
    );
  } 

  isFadeShow() {
    setTimeout(() => {
      this.isFade = true;
    }, 10000)
  }

  recupereAuth() {
      this.spb.getUserAuthenticated().subscribe(
      rep => {
        this.userAuth = rep;      
        if (this.userAuth.pseudo !== null) {
          
         /*  console.log("recupere auth dans spb" , this.userAuth);
          this.films = this.userAuth.carts;
          this.covers = this.films;
          console.log(this.films); */
          //this.totalCarts();
          //this.recupereUsersStorage();
          //this.recupereCarts();
        }
        else {
          // Si l'utilisateur n'est pas connecté on est renvoyé vers la home : 
          console.log("je suis dans sp et pas authenthifié" , this.userAuth)
          this.router.navigate(['/home']);
        }
      },
      error => console.log("erreur pour récuperer si on est authentifié")
    );
  }

  /* recupereUsersStorage(){

    console.log(this.userAuth);
  } */


}
