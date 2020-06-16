import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { Film } from 'src/film';
import { SpbService } from './spb.service';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  filmAAfficher: BehaviorSubject<Film>;
  isAffiche: BehaviorSubject<boolean>;
  listeFilmRecherche: BehaviorSubject<Film[]>;
  rechercheInput: BehaviorSubject<string>;
  bool = false;

  movies: BehaviorSubject<any>;
  tvs: BehaviorSubject<any>;
  peoples: BehaviorSubject<any>;

  /* cart: BehaviorSubject<any>;
  carts: BehaviorSubject<any>; */

  
  selectedIcon: BehaviorSubject<any>;

  constructor() {
    this.selectedIcon = new BehaviorSubject({home: true, favoris: false, inscription: false, login: false, logout:false, spb: false });
    this.isAffiche = new BehaviorSubject<boolean>(false);
    this.filmAAfficher = new BehaviorSubject<Film>(null);
    this.listeFilmRecherche = new BehaviorSubject<Film[]>(null);
    this.rechercheInput = new BehaviorSubject<string>(null);

    this.movies = new BehaviorSubject<any>(null);
    this.tvs = new BehaviorSubject<any>(null);
    this.peoples = new BehaviorSubject<any>(null);

    /* this.cart = new BehaviorSubject<any>({quantity: 0, total: 0});
    this.carts = new BehaviorSubject<any>(null); */
  }

  public setSelectIcon(resultat) {
    this.selectedIcon.next(resultat);
  }

  public getSelectIcon() {
    return this.selectedIcon.asObservable();
  }

  public getAfficheFilm() {
    return this.isAffiche.asObservable();
  }

  public setAfficheFilm() {
    console.log('Dans le service : on fixe le setAffiche');
    this.bool = !this.bool;
    this.isAffiche.next(this.bool);
    console.log('Dans le service : setAffiche' , this.isAffiche);
  }

  public setAfficheThisFilm(film) {
    this.filmAAfficher.next(film);
    //console.log('Dans le service : on fixe le setAfficheThisFilm' , film);

  }

  public getAfficheThisFilm() {
    return this.filmAAfficher.asObservable();
  }


  // l'observalbe de la liste de film qu'on cherche :
  public setListeFilmRecherche(film) {
    this.listeFilmRecherche.next(film);
    console.log('Dans le service : on fixe le setListeFilmRecherche' , film);

  }

  public getListeFilmRecherche() {
    console.log('Dans le service : on return le getListeFilmRecherche' , this.listeFilmRecherche);
    return this.listeFilmRecherche.asObservable();
  }

  // l'observable du champ de recherche :
  public setRechercheInput(resultat) {

    this.rechercheInput.next(resultat);
    // on va faire la recherche du mot clé dans notre tableau ;
    // tslint:disable-next-line:max-line-length
    /* const resultatListe = this.listeFilmBD.filter(film =>
                          film.titre.toLowerCase().includes(resultat.toLowerCase())
                          ||
                          film.realisateur.toLowerCase().includes(resultat.toLowerCase())
                          ||
                          film.description.toLowerCase().includes(resultat.toLowerCase())
                          );
    const resultatListeActeurs = [];
    // On recherche les acteurs :
    this.listeFilmBD.forEach(film => film.acteurs.forEach(acteur => {
         if ( acteur.toLowerCase().includes(resultat.toLowerCase()) ) {
            resultatListeActeurs.push(film);
         }
      }));
    console.log(resultatListeActeurs);

    console.log('Dans le service : on fixe la recherche input' , resultat,  resultatListe);
    // On cacatène la premiere liste et celle des acteurs :
    this.setListeFilmRecherche(resultatListe.concat(resultatListeActeurs));
 */
  }

  public getRechercheInput() {
    console.log('Dans le service : on return la recherche input' , this.rechercheInput);
    return this.rechercheInput.asObservable();
  }


  // Les tableaux pour la recherche :
  public setSearchMovies(resultat) {
    console.log('movies > ', this.movies);
    this.movies.next(resultat);
  }

  public getSearchMovies() {
    console.log('movies > ', this.movies);
    return this.movies.asObservable();
  }

  public setSearchTvs(resultat) {
    this.tvs.next(resultat);
  }

  public getSearchTvs() {
    return this.tvs.asObservable();
  }

  public setSearchPeoples(resultat) {
    this.peoples.next(resultat);
  }

  public getSearchPeoples() {
    return this.peoples.asObservable();
  }

  /* public setCart(resultat) {
    this.cart.next(resultat);
  }

  public getCart() {
    return this.cart.asObservable();
  }

  public setCarts(resultat) {
    
    // on recupere l'utilisateur dans le local storage
    let setUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {} ;
    setUser.carts = resultat;
    let stateStringify = JSON.stringify(setUser)
    localStorage.setItem('user', stateStringify);
    
    this.carts.next(resultat);
  }

  public getCarts() {
    return this.carts.asObservable();
  } */

}
