import { Component, OnInit } from '@angular/core';
import { InOutService } from '../services/in-out.service';
import { Film } from 'src/film';
import { TmdbService } from '../services/tmdb.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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
  pagination: any = [];
  page: any = [];
  page3: any;
  pageTotal: any;
  results: any = [];

  noReponse = null;

  constructor(private tmdb: TmdbService, private inout: InOutService, private route: ActivatedRoute, private router: Router, ) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();
    this.maRecherche = this.route.snapshot.paramMap.get('query');
    this.page = parseInt(this.route.snapshot.paramMap.get('page'));
    //console.log(this.maRecherche);
    // console.log(' 0 dans constructor');

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.maRecherche = this.route.snapshot.paramMap.get('query');
        this.page = parseInt(this.route.snapshot.paramMap.get('page'));

        const url = val.url;
        console.log(url);
        console.log('dans constructor  ma recherche = ', this.maRecherche);
        this.search();
      }
    });
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.page3 = this.page + 3;
    console.log(this.page3);
  }

  initialisation() {
    this.movies = [];
    this.tvs = [];
    this.peoples = [];

    this.pagination = [];
    this.results = [];

    this.noReponse = null;

  }

  search() {
    console.log('dans search ma recherche = ', this.maRecherche);
    this.initialisation();
    this.page3 = parseInt(this.page) + 3;


    this.tmdb.search(this.maRecherche, this.page).subscribe(
      result => {
        console.log('resultat requete ', result);
        this.results = result['results'];
        this.movies = result['results'].filter(movie => movie.media_type === 'movie');
        this.tvs = result['results'].filter(tv => tv.media_type === 'tv');
        this.peoples = result['results'].filter(people => people.media_type === 'person');

        this.pagination = this.pagination ? new Array(result['total_pages']).fill(result['total_pages']) : [];
        this.pageTotal = result['total_pages'];
        console.log('quel est la page :: ', this.page , this.page3 , this.pageTotal, 'taille : ', this.results.length);
        this.noReponse =  this.results.length === 0 ? 
        'No results for your search !! Don"t be shy try your luck again with a new search' :
        null;
        console.log(this.noReponse);
      }
      ,
      // tslint:disable-next-line:max-line-length
      error => {
        console.log('Une erreur est survenue, On arrive pas à charger les resultats de la mutli recherche pour' + this.maRecherche, error);
        this.noReponse = "No results for your search !! Don't be shy try your luck again with a new search";

      }
    );
  }
}
