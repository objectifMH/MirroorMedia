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
  topFilms: any;
  tvs: any;
  topTvs: any;

  constructor(private inoutService: InOutService, private tmdb: TmdbService) { }

  @Output()
  afficheFilm = new EventEmitter();

  titre1 = 'Most popular movies';
  titre2 = 'Most popular tv Show';
  titre3 = 'Top rated Movies';
  titre4 = 'Top rated tv Show';

  ngOnInit() {
    this.onGetDiscoversFilms();
    this.onGetDiscoversTvs();
    this.onGetTopRatedFilms();
    this.onGetTopRatedTvs();
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
           this.films = data['results'].slice(0, 15);
           //this.filmsOther = data['results'].slice(5, data['results'].length);
           //console.log('films dans liste tendance Slide ' , this.films , this.filmsOther);
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

      //getTopRatedFilms
      onGetTopRatedFilms() {
        this.tmdb.getTopRatedFilms().subscribe(
            data => {
               this.topFilms = data['results'];
            },
            err => {
              console.log(err);
            });
        } 

        
        onGetTopRatedTvs() {
          this.tmdb.getTopRatedTvs().subscribe(
              data => {
                 this.topTvs = data['results'];
              },
              err => {
                console.log(err);
              });
          } 
}
