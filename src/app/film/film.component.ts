import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  film: any = {};
  directorName: any = '';
  urlBaseImage: any = '';
  trailers: any = [];
  urlBackDrop: string = '';

  acteursFull: any;
  crewsFull: any;
  acteurs: any;
  director: any;
  minActeurs = false;

  plus = true;
  type = true;


  constructor(private route: ActivatedRoute, private router: Router, private tmdb: TmdbService) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();

  }

  ngOnInit() {
    const peopleId = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.paramMap.get('type');
    if ( type === 'movie') {
      this.getFilms(peopleId);
    } else {
      this.getTv(peopleId);
    }

  }

  // Info sur film :
  getFilms(id) {
    this.tmdb.getInfoFilm(id).subscribe(
      result => {
        this.film = result;
        console.log(this.film);
        this.urlBackDrop = this.film.backdrop_path ? this.urlBaseImage+this.film.backdrop_path : '';
        this.getActeurs();


      }
      ,
      error => console.log('Une erreur est survenue, On arrive pas à charger les infos du film' + id, error)
    );
  }

  // Info sur tv :
  getTv(id) {
    this.tmdb.getInfoTv(id).subscribe(
      result => {
        this.film = result;
        console.log(this.film);
        this.getActeurs();

      }
      ,
      error => console.log('Une erreur est survenue, On arrive pas à charger les infos du show tv' + id, error)
    );
  }

  getActeurs() {
    this.tmdb.getActeursByFilm(this.film).subscribe(
      data => {
        console.log(data);
        this.acteursFull = data['cast'];
        this.crewsFull = data['crew'];

        this.acteurs = this.acteursFull.slice(0, 8);
        this.director  = this.crewsFull.filter( crew => crew.job === 'Director');
        this.directorName = data['crew'].length !== 0 ? ( this.director[0] ? this.director[0].name : false ) : false;
        this.minActeurs = this.acteursFull.length > 8 ? true : false;
        this.tmdb.getTrailers(this.film).subscribe(
          dataTrailers => {
            console.log(dataTrailers);
            this.trailers = dataTrailers['results'];

          }
        )
        
      },
      err => {
        console.log(err);
      });
  }

  plusMoinsActeurs() {
    if ( this.plus === true) {
      this.acteurs = this.acteursFull;
    } else {
      this.acteurs = this.acteursFull.slice(0, 8);
    }
    this.plus = !this.plus;
  }
}
