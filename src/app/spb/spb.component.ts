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
              this.films = [...this.films, {filmdb: resCovers['results'][0] ,iddb : film.id, prixdb : film.prix}];
              console.log("covers ",  this.covers, this.films);
            }
          )        
        }); 
       // console.log("films spb boot :" , this.films , filmsWCover);
        
      }
      ,
      error => console.log('Une erreur est survenue, On arrive pas à charger les films de la spb bd', error)
    );
  }


}
