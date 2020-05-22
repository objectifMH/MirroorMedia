import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InOutService } from '../services/in-out.service';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-liste-tendance-slide',
  templateUrl: './liste-tendance-slide.component.html',
  styleUrls: ['./liste-tendance-slide.component.scss']
})
export class ListeTendanceSlideComponent implements OnInit {
  films: any;
  tvs: any;

  constructor(private inoutService: InOutService, private tmdb: TmdbService) { }

  @Output()
  afficheFilm = new EventEmitter();

  titre1 = 'Most popular movies';
  titre2 = 'Most popular tv Show';
  titre3 = 'Films';

  ngOnInit() {
    this.onGetDiscoversFilms();
    this.onGetDiscoversTvs();

  }

  /* detailFilm() {
    console.log('Dans la liste : j ai bien cliqué sur la liste ');
    // this.afficheFilm.emit();
    this.inoutService.setAfficheFilm();
  } */

  afficheFilmSelected(film) {

    //console.log('Dans liste Slide : ', film);
    //this.inoutService.setAfficheFilm();
    this.inoutService.setAfficheThisFilm(film);
    
  }

  onGetDiscoversFilms() {
    this.tmdb.getDiscoverFilms().subscribe(
        data => {
           this.films = data['results'];
           console.log('films dans liste tendance Slide ' , this.films , data);
        },
        err => {
          console.log(err);
        });
    }

    onGetDiscoversTvs() {
      this.tmdb.getDiscoverTvs().subscribe(
          data => {
             this.tvs = data['results'];
             console.log('tvs shows dans liste tendance Slide ' , this.tvs, data);
          },
          err => {
            console.log(err);
          });
      }
}
