import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/film';
import { InOutService } from '../in-out.service';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-tendance-slide',
  templateUrl: './tendance-slide.component.html',
  styleUrls: ['./tendance-slide.component.scss']
})
export class TendanceSlideComponent implements OnInit {

  @Input()
  titre: string;

  @Output()
  filmOutput = new EventEmitter();

  films: Film[] = [];
  styleLeft = 0;
  isPresentG = true;
  isPresentD = true;

  isFilmAffiche: Film = null;

  constructor(private inoutService: InOutService, private filmService: MovieService) { }

  ngOnInit() {
    //this.films = this.inoutService.listeFilmBD;
    this.getFilms();

    this.isPresentG = false;
  }

  clickFilmSlide(film) {
    // console.log('Dans tendanceSlide :', film);
    //this.filmOutput.emit(film);

    this.isFilmAffiche = film;
    //console.log("> Slide ", film);

  }

  closeAfficheFilm(ev) {
    this.isFilmAffiche = null;
  }

  clickDroit() {
    const tailleImage = window.innerWidth / 7;
    this.isPresentD = true;
    this.isPresentG = true;
    if (this.styleLeft > (-window.innerWidth)) {
      this.styleLeft -= tailleImage;
    } else {
      this.isPresentD = false;
    }
    console.log(this.styleLeft);

    if (Math.abs(this.styleLeft) >= Math.abs(window.innerWidth)) {
      this.isPresentD = false;
      console.log("supprime toi a droit");
    }

    console.log(Math.abs(this.styleLeft) + '  ' + Math.abs(window.innerWidth));
  }

  clickGauche() {
    const tailleImage = window.innerWidth / 7;
    this.isPresentG = true;
    this.isPresentD = true;
    if (this.styleLeft < 0) {
      this.styleLeft += tailleImage;
    }

    if (this.styleLeft >= 0 && this.styleLeft < tailleImage) {
      this.isPresentG = false;
    }
  }

  getFilms() {
    this.filmService.getFilms().subscribe(
      film => {
        if (film['_embedded']['movies']) {
          film['_embedded']['movies'].forEach(movies => {
            let film: Film = {id: 0, titre: 'Gattaca', realisateur: '', acteurs: [], description: '', cover: '../../assets/CoverFilm/no.jpg', date:''};
            console.log(movies, film, movies.id);
            film.id = movies.id;
            film.titre = movies.title;
            film.date = movies.date; 
            
            this.films.push(film);
          
          
        });
      }

    console.log("%s %O", "Mes films : ", this.films);
  },
  err => {
  console.log("%s %O", "Pas de films ", err);

  //this.errorMessage = err.error.message;

}
    )
  }
}
