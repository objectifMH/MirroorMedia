import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/film';
import { InOutService } from '../services/in-out.service';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  @Input()
  film: any;

  @Output()
  isCloseAffiche = new EventEmitter();

  acteursFull: any;
  crewsFull: any;
  acteurs = [];
  directorName: any;
  director: any;
  minActeurs = false;
  trailers: any = [];

  plus = true;

  urlBaseImage: any;

  constructor(private tmdb: TmdbService) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();

  }

  ngOnInit() {
    this.getActeurs();
  }

  ngOnChanges() {
    this.getActeurs();
  }

  closeAffiche() {
    this.isCloseAffiche.emit();
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





         //console.log('acteurs  dans liste tendance test Components ' , this.acteurs, data, this.crewsFull, ' director > ', this.directorName);
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
