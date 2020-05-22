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
  acteurs: any;

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
         this.acteursFull = data['cast'];
         this.crewsFull = data['crew'];

         this.acteurs = this.acteursFull.slice(0, 8);
         console.log(this.acteurs);




         console.log('acteurs  dans liste tendance test Components ' , this.acteurs, data, this.crews);
      },
      err => {
        console.log(err);
      });
  }
}
