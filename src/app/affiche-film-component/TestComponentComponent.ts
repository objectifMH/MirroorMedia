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
  directorName: any;
  director: any;

  urlBackDrop = 'https://image.tmdb.org/t/p/original';
  urlImgActeur = '';

  cheminImgSrc = '../../assets/CoverFilm/AfficheFilm/';
  constructor(private inoutService: InOutService, private tmdb: TmdbService) { 
  }

  ngOnInit() {
    this.getUtilisateurs();
  }

  ngOnChanges() {
    this.getUtilisateurs();
  }

  closeAffiche() {
    //this.inoutService.setAfficheThisFilm(null);

    //this.film = null;
    this.isCloseAffiche.emit();
  }

  getUtilisateurs() {
    //console.log(this.film);
    this.tmdb.getActeursByFilm(this.film).subscribe(
      data => {
        console.log(data);
        this.acteursFull = data['cast'];
        this.crewsFull = data['crew'];

        this.acteurs = this.acteursFull.slice(0, 8);
        //console.log(this.acteurs );
        this.director  = this.crewsFull.filter( crew => crew.job === 'Director'); 
        //console.log(data['crew'].length);
        this.directorName = data['crew'].length !== 0 ? this.director[0].name : false;
        //console.log('director :: > ' + this.directorName);




         //console.log('acteurs  dans liste tendance test Components ' , this.acteurs, data, this.crewsFull, ' director > ', this.directorName);
      },
      err => {
        console.log(err);
      });
  }
}
