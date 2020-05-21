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

  constructor(private inoutService: InOutService, private tmdb: TmdbService) { }

  @Output()
  afficheFilm = new EventEmitter();

  titre1 = 'Tendance Actuelle';
  titre2 = 'Nouveautés';
  titre3 = 'Films';

  ngOnInit() {
    this.onGetDiscoversFilms();

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
    console.log('dans Liste Tendance Slide');
    this.tmdb.getDiscover().subscribe(
        data => {
           this.films = data.results;
           console.log(data);

        },
        err => {
          console.log(err);
        });
    }
}
