import { Component, OnInit } from '@angular/core';
import { InOutService } from '../services/in-out.service';
import { Film } from 'src/film';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-liste-recherche-film',
  templateUrl: './liste-recherche-film.component.html',
  styleUrls: ['./liste-recherche-film.component.scss']
})
export class ListeRechercheFilmComponent implements OnInit {

  movies: any = [];
  tvs: any = [];
  peoples: any = [];

  maRecherche: any = '';

  urlBaseImage: any;

  constructor(private tmdb: TmdbService, private inout: InOutService, private route: ActivatedRoute, private router: Router, ) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();
    this.maRecherche = this.route.snapshot.paramMap.get('query');
    console.log(this.maRecherche);
   
  }

  ngOnInit() {
    this.search();
  }


  search() {
    this.tmdb.search(this.maRecherche).subscribe(
      result => {
        console.log(result);
        this.movies = result['results'].filter(movie => movie.media_type === 'movie');
        this.tvs = result['results'].filter(tv => tv.media_type === 'tv');
        this.peoples = result['results'].filter(people => people.media_type === 'people');
      }
      ,
      // tslint:disable-next-line:max-line-length
      error => console.log('Une erreur est survenue, On arrive pas à charger les resultats de la mutli recherche pour' + this.maRecherche, error)
    );
  }
}