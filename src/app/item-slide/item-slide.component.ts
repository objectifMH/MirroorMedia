import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/film';

@Component({
  selector: 'app-item-slide',
  templateUrl: './item-slide.component.html',
  styleUrls: ['./item-slide.component.scss']
})
export class ItemSlideComponent implements OnInit {

  //film: Film = {id: 0, titre: 'Gattaca', realisateur: '', acteurs: [], description: '', cover: '../../assets/CoverFilm/gat.jpeg'};

  @Input()
  filmItem: any;

  @Output()
  clickFilm = new EventEmitter();

  cheminImgSrc = "https://image.tmdb.org/t/p/original/"; //'../../assets/CoverFilm/';

  constructor() { }

  ngOnInit() {
  }

  clickedFilm() {
    console.log(this.filmItem);
    this.clickFilm.emit(this.filmItem);
  }


}
