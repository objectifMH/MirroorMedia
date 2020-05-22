import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { Film } from 'src/film';

@Injectable({
  providedIn: 'root'
})
export class InOutService {

  listeFilmBD = [
    {id: 0, titre: 'Gattaca', realisateur: 'Andrew Niccol', acteurs: ['Ethan Hawke', 'Uma Thurman'], 
    // tslint:disable-next-line:max-line-length
    description: 'A genetically inferior man assumes the identity of a superior one in order to pursue his lifelong dream o space travel.', cover: '0.jpg'},
    // tslint:disable-next-line:max-line-length
    {id: 1, titre: 'Interstellar', realisateur: '‎Christopher Nolan', acteurs: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine', 'Casey Affleck', 'Matt Damon'], 
    // tslint:disable-next-line:max-line-length
    description: 'Dans un futur proche, la Terre est de moins en moins accueillante pour l\'humanité qui connaît une grave crise alimentaire. Le film raconte les aventures d\'un groupe d\'explorateurs qui utilise une faille récemment découverte dans l\'espace-temps afin de repousser les limites humaines et partir à la conquête des distances astronomiques dans un voyage interstellaire.', cover: '1.jpg'},
    {id: 2, titre: 'Dark Knight', realisateur: '', acteurs: [], description: '', cover: '2.jpg'},
    // tslint:disable-next-line:max-line-length
    {id: 3, titre: 'Rencontre Avec Joe Black', realisateur: 'Martin Brest', acteurs: ['Anthony Hopkins', 'Brad Pitt', 'Claire Forlani', 'Jake Weber', 'Marcia Gay Harden'], description: 'Une nuit, le magnat William Parrish ressent une violente douleur tandis qu\'une voix surgissant des ténèbres lui annonce sa mort prochaine. À ce moment-là, un jeune inconnu se présente à son domicile pour l\'accompagner dans son dernier voyage. Ce messager de l\'au-delà impose à Parrish de l’héberger chez lui afin de lui donner l\'occasion de partager un temps les expériences, les joies, les émotions et les drames des vivants, qui semblent lui être étrangers. En l\'espace de trois jours, Joe Black révèlera toute la famille Parrish à elle-même.', cover: '3.jpg'},
    {id: 4, titre: 'Joker', realisateur: '', acteurs: [], description: '', cover: '4.jpg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: ['Tom cruise'], description: '', cover: '5.jpg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '6.jpg'},

    {id: 7, titre: 'Will hunting', realisateur: '', acteurs: [], description: '', cover: '7.jpg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: [], description: '', cover: '5.jpg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '6.jpg'},

    {id: 4, titre: 'Joker', realisateur: '', acteurs: [], description: '', cover: '4.jpg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: [], description: '', cover: '5.jpg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '6.jpg'},

    {id: 4, titre: 'Joker', realisateur: '', acteurs: [], description: '', cover: '4.jpg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: [], description: '', cover: '5.jpg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '6.jpg'},

    {id: 4, titre: 'Joker', realisateur: '', acteurs: [], description: '', cover: '4.jpg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: [], description: '', cover: '5.jpg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '6.jpg'},

    {id: 4, titre: 'Joker', realisateur: '', acteurs: [], description: '', cover: '4.jpg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: [], description: '', cover: '5.jpg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '6.jpg'},

    {id: 4, titre: 'Joker', realisateur: '', acteurs: [], description: '', cover: '4.jpg'},
    {id: 5, titre: 'Jack Reacher', realisateur: '', acteurs: [], description: '', cover: '5.jpg'},
    {id: 6, titre: 'Undercover', realisateur: '', acteurs: [], description: '', cover: '6.jpg'},
    
   ];

  filmAAfficher: BehaviorSubject<Film>;
  isAffiche: BehaviorSubject<boolean>;
  listeFilmRecherche: BehaviorSubject<Film[]>;
  rechercheInput: BehaviorSubject<string>;
  bool = false;

  constructor() {
    this.isAffiche = new BehaviorSubject<boolean>(false);
    this.filmAAfficher = new BehaviorSubject<Film>(null);
    this.listeFilmRecherche = new BehaviorSubject<Film[]>(null);
    this.rechercheInput = new BehaviorSubject<string>(null);
  }

  public getListFilmBD() {
    return this.listeFilmBD;
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
    //console.log('Dans le service : on return le getAfficheThisFilm' , this.filmAAfficher);
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
    const resultatListe = this.listeFilmBD.filter(film =>
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

  }

  public getRechercheInput() {
    console.log('Dans le service : on return la recherche input' , this.rechercheInput);
    return this.rechercheInput.asObservable();
  }
}
