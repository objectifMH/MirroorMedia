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

  acteurs: any;
  crews: any;

  urlBackDrop = 'https://image.tmdb.org/t/p/original/';

  cheminImgSrc = '../../assets/CoverFilm/AfficheFilm/';
  constructor(private inoutService: InOutService, private tmdb: TmdbService) { }
  ngOnInit() {
    this.getUtilisateurs();
  }

  closeAffiche() {
    //this.inoutService.setAfficheThisFilm(null);

    //this.film = null;
    this.isCloseAffiche.emit();
  }

  getUtilisateurs() {
    this.tmdb.getActeursByFilm(this.film.id).subscribe(
      data => {
         this.acteurs = data['cast']//[0]['cast'];
         this.crews = data['crew']//[0]['crew'];

         console.log('acteurs  dans liste tendance test Components ' , this.acteurs, data, this.crews);
      },
      err => {
        console.log(err);
      });
  }
}
