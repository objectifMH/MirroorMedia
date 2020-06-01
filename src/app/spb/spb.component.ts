import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpbService } from '../services/spb.service';
import { TmdbService } from '../services/tmdb.service';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-spb',
  templateUrl: './spb.component.html',
  styleUrls: ['./spb.component.scss']
})
export class SpbComponent implements OnInit {


  films: any = [];
  results: any =[];
  covers: any = [];
  urlBaseImage: any;
  errorConSpb: any;
  cart = {quantity: 0, total: 0};
  carts: any = [];
  article = 'article';

  constructor(private route: ActivatedRoute, private router: Router, private spb: SpbService,
              private tmdb: TmdbService
    ) {  this.urlBaseImage = this.tmdb.getUrlBaseImg();

  }

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.spb.getAllMovies().subscribe(
      result => {
        this.covers = result['_embedded']['movies'];
        this.results= result['_embedded']['movies'];
        
        let filmsWCover = this.covers.map(film => {
          this.tmdb.search(film.title).subscribe(
            resCovers => {
              this.films = [...this.films, {filmdb: resCovers['results'][0] ,iddb : film.id, prixdb : film.prix, inCart : false}];
              console.log("covers ",  this.covers, this.films);
            }
          )        
        }); 
       // console.log("films spb boot :" , this.films , filmsWCover);
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
    console.log(film);
    let index = this.films.indexOf(film);
    film.inCart = !film.inCart;
    console.log(index);
    this.totalCarts();
  }

  totalCarts() {
    console.log("dans Total carts");
    let tot = 0;
    let compt = 0;
    this.films.filter( film => film.inCart === true).map(film =>  {
      compt++;
      tot = film.prixdb + tot;
    });
    this.cart = {
                quantity: compt,
                // tslint:disable-next-line:radix
                total: parseInt(tot.toFixed(2))
              };
    this.article = compt > 0 ? 'articles' : 'article';
  }
}
