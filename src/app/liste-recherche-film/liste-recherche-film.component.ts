import { Component, OnInit } from '@angular/core';
import { InOutService } from '../services/in-out.service';
import { Film } from 'src/film';

@Component({
  selector: 'app-liste-recherche-film',
  templateUrl: './liste-recherche-film.component.html',
  styleUrls: ['./liste-recherche-film.component.scss']
})
export class ListeRechercheFilmComponent implements OnInit {


  listeFilmRecherche: Film[] = [
    
   ];
  maRecherche = '';

  isFilmAffiche: Film = null;

  constructor(private inoutService: InOutService) {
    this.inoutService.setAfficheThisFilm(null);
  }

  ngOnInit() {
    this.recupereInputRecherche();
    this.recupereListeFilm();
    
  }

  recupereListeFilm() {
    //console.log('Dans ListeRechercheFilmComponent.ts :  > ');
    this.inoutService.getListeFilmRecherche().subscribe(
      data => {
        //console.log('Dans ListeRechercheFilmComponent.ts : dans l observable affiche this listeRecherche >' , data);
        this.listeFilmRecherche = data;
      },
      err => {
        //console.log('erreur observable dans ListeRechercheFilmComponent', err);
      }
    );
  }

  recupereInputRecherche() {
    //console.log('Dans ListeRechercheFilmComponent.ts : recupereInputRecherche > ');
    this.inoutService.getRechercheInput().subscribe(
      data => {
        this.maRecherche = data;
        //console.log('Dans ListeRechercheFilmComponent.ts : dans l observable affiche this listeRecherche >' , data);
        this.recupereListeFilm();
      },
      err => {
        //console.log('erreur observable dans ListeRechercheFilmComponent', err);
      }
    );
  }

  afficheFilmRecherche(film) {
    //console.log('set affiche this film ', film);
    //this.inoutService.setAfficheThisFilm(film);
    this.isFilmAffiche = film;
  }

  closeAfficheFilm() {
    this.isFilmAffiche = null;
    console.log("jeteferme");
  }

}
