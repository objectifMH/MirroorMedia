import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';
import { Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userAuth;
  films = [];
  urlBaseImage = '';

  constructor(private spb: SpbService, private router: Router, private tmdb: TmdbService) {
    this.urlBaseImage = this.tmdb.getUrlBaseImg();
  }

  ngOnInit(): void {
    this.recupereAuth();
  }


  recupereAuth() {
    this.spb.getUserAuthenticated().subscribe(
      rep => {
        this.userAuth = rep;
        if (this.userAuth.carts) {
          this.films = rep.carts.filter(film => film.inCart === true);
        } else {
          this.recupereCarts();
        }


        console.log('recupere auth dans spb', this.userAuth.pseudo);
        if (this.userAuth.pseudo === null) {

          // Si l'utilisateur n'est pas connecté on est renvoyé vers la home :
          this.router.navigate(['/home']);
        }
      },
      error => console.log('erreur pour récuperer si on est authentifié')
    );
  }

  recupereCarts() {
    this.spb.getCarts().subscribe(
      data => {
        if (data) {
          this.films = data.filter(film => film.inCart === true);
        }
        console.log(data, this.films);
      },
      error => {
        return console.log('Erreur, récupération recupereCarts dans user.ts');
      });
  }

}