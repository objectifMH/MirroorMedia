import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: any = {};
  moviesFull: any = [];
  movies: any = [];
  tvsFull: any = [];
  tvs: any = [];
  plusMovies = true;
  plusTvs = true;
  minMovies = false;
  minTvs = false;

  urlBaseImage: any;

  constructor(private route: ActivatedRoute, private router: Router, private tmdb: TmdbService) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();

  }

  ngOnInit() {
    const peopleId = this.route.snapshot.paramMap.get('id');
    this.getActeurs(peopleId);
    this.getFilmsForActeurs(peopleId);
    this.getTvsForActeurs(peopleId);

  }

  getActeurs(id) {
    this.tmdb.getActeurs(id).subscribe(
      result => {
        this.people = result;

      }
      ,
      error => console.log('Une erreur est survenue, On arrive pas à charger les infos de l acteur' + id, error)
    );
  }

  getFilmsForActeurs(id) {
    this.tmdb.getFilmsForActeur(id).subscribe(
      result => {
        this.moviesFull = result['cast'];
        //console.log(this.moviesFull);
        this.movies = this.moviesFull.slice(0, 6);
        
        this.minMovies = this.moviesFull.length > 6 ? true : false;

      }
      ,
      error => console.log('Une erreur est survenue, On arrive pas à charger les films de l acteur' + id, error)
    );
  }

  getTvsForActeurs(id) {
    this.tmdb.getTvForActeur(id).subscribe(
      result => {
        this.tvsFull = result['cast'];
        this.tvs = this.tvsFull.slice(0, 6); console.log(this.tvs);
        this.minTvs = this.tvsFull.length > 6 ? true : false;
        //console.log('tv show actor ', result);

      }
      ,
      error => console.log('Une erreur est survenue, On arrive pas à charger les TvShows de l acteur' + id, error)
    );
  }

  plusMoinsMovies() {
    if ( this.plusMovies ) {
      this.movies = this.moviesFull;
    } else {
      this.movies = this.moviesFull.slice(0, 6);
    }
    this.plusMovies = !this.plusMovies;
  }

  plusMoinsTvs() {
    if (this.plusTvs) {
      this.tvs = this.tvsFull;
    } else {
      this.tvs = this.tvsFull.slice(0, 6);
    }
    this.plusTvs = !this.plusTvs;
  }

}
