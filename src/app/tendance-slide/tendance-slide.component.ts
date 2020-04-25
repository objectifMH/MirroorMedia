import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/film';

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

  films: Film[] = [
    {id: 0, titre: 'Gattaca', realisateur: 'Andrew Niccol', acteurs: ['Ethan Hawke', 'Uma Thurman'], 
    // tslint:disable-next-line:max-line-length
    description: 'A genetically inferior man assumes the identity of a superior one in order to pursue his lifelong dream o space travel.', cover: '../../assets/CoverFilm/gat.jpeg'},
    // tslint:disable-next-line:max-line-length
    {id: 1, titre: 'Interstellar', realisateur: '', acteurs: ['Ethan Hawke', 'Uma Thurman'], 
    // tslint:disable-next-line:max-line-length
    description: 'A genetically inferior man assumes the identity of a superior one in order to pursue his lifelong dream o space travel.', cover: '../../assets/CoverFilm/inter.jpeg'},
    {id: 2, titre: 'Dark Knight', realisateur: '', acteurs: [], description: '', cover: '../../assets/CoverFilm/dk.jpeg'},
    {id: 3, titre: 'Rencontre Avec Joe Black', realisateur: '', acteurs: [], description: '', cover: '../../assets/CoverFilm/joe.jpeg'},
    {id: 4, titre: 'Joker', realisateur: '', acteurs: [], description: '', cover: '../../assets/CoverFilm/joker.jpeg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: [], description: '', cover: '../../assets/CoverFilm/jr.jpeg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '../../assets/CoverFilm/undercover.jpeg'},
   ];

  constructor() { }

  ngOnInit() {
  }

  clickFilmSlide(film) {
    console.log('Dans tendanceSlide :', film);
    this.filmOutput.emit(film);
  }
}
