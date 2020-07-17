import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Film } from 'src/film';
import { InOutService } from '../services/in-out.service';
import { TmdbService } from '../services/tmdb.service';

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

  @Input()
  films: Film[] = [];
  styleLeft = 0;
  isPresentG = true;
  isPresentD = true;

  isFilmAffiche: Film = null;

  constructor(private inoutService: InOutService, private tmdbService: TmdbService) { }

  ngOnInit() {
    // this.films = this.inoutService.listeFilmBD;
    // console.log('Dans ngOnInit');
    this.isPresentG = false;
  }

  clickFilmSlide(film) {
    // console.log('Dans tendanceSlide :', film);
    // this.filmOutput.emit(film);

    this.isFilmAffiche = film;
    // console.log("> Film Slide Affiche : ", film);

  }

  closeAfficheFilm(ev) {
    this.isFilmAffiche = null;
  }

  clickDroit() {
    const container = window.innerWidth - 1 / 100;
    let add = window.innerWidth - container;

    let div;
    if (window.innerWidth > 768 ) {
      div = 7;
      add = add / 7;
      console.log(window.innerWidth, div);
    } else if ( window.innerWidth <= 768  && window.innerWidth > 425) {
      div = 5;
      add = add / 5;
      console.log(window.innerWidth, div);
    } else if ( window.innerWidth <= 425  ) {
      div = 3;
      add = add / 3;
      console.log(window.innerWidth, div);
    }

    const tailleImage = container / div ;
    this.isPresentD = true;
    this.isPresentG = true;

    if (this.styleLeft > (- tailleImage * 15)) {
      this.styleLeft -= (tailleImage + add);
      console.log('dans if', this.styleLeft);
    } else {
      this.isPresentD = false;
      console.log('dans else : ', this.styleLeft);
    }
    console.log(this.styleLeft);

    if (Math.abs(this.styleLeft) >= Math.abs(tailleImage * (15 - div))) {
      this.isPresentD = false;
      console.log('supprime toi a droit');
    }

    console.log(Math.abs(this.styleLeft) + '  ' + Math.abs(window.innerWidth) + ' ' + Math.abs(tailleImage * 15) + ' ' + container + ' ' +tailleImage );
  }

  clickGauche() {

    const container = window.innerWidth - 1 / 100;
    let add = window.innerWidth - container;

    let div;
    if (window.innerWidth > 768 ) {
      div = 7;
      add = add / 7;
      console.log(window.innerWidth, div);
    } else if ( window.innerWidth <= 768  && window.innerWidth > 425) {
      div = 5;
      add = add / 5;
      console.log(window.innerWidth, div);
    } else if ( window.innerWidth <= 425) {
      div = 3;
      add = add / 3;
      console.log(window.innerWidth, div);
    }

    const tailleImage = container / div ; //window.innerWidth / div;
    this.isPresentG = true;
    this.isPresentD = true;
    if (this.styleLeft < 0) {
      this.styleLeft += (tailleImage + add);
      console.log('< 0 ' , this.styleLeft);
    }

    if (Math.abs(this.styleLeft) >= 0 && Math.abs(this.styleLeft) < tailleImage) {
      this.isPresentG = false;
      console.log('>= 0 && this.styleLeft < tailleImage' , this.styleLeft);
    }
    console.log(Math.abs(this.styleLeft)+ '  ' + window.innerWidth + ' ' + Math.abs(tailleImage * 15) + ' ' + container + ' ' +tailleImage );
  
  }

}
