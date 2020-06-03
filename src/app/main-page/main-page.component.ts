import { Component, OnInit } from '@angular/core';
import { InOutService } from '../services/in-out.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;

  title = 'NetFilm';
  isFilmAffiche;
  isSelectedIcon = { home: true, favoris: false, inscription: false, compte: false, spb: false };
  isShow = true;
  cart = {quantity: 0, total: 0};

  constructor(private inoutService: InOutService, private router: Router, private tmdb: TmdbService) {
    //this.inoutService.setAfficheThisFilm(null);
  }


  ngOnInit() {
    //this.afficheThisFilm();
    this.recupereSpb();
  }

  clickIcon(li) {
    const attr = li.getAttribute('data-icon');
    // tslint:disable-next-line:forin
    for (const icon in this.isSelectedIcon) {
      this.isSelectedIcon[icon] = false;
      if (icon === attr) {
        this.isSelectedIcon[icon] = true;
      }

    }
  }

  /* afficheThisFilm() {
    console.log('Dans App.component.ts : afficheThisFilm on souscrit à l observable > ');
    this.inoutService.getAfficheThisFilm().subscribe(
      data => {
        console.log('Dans App.component.ts : dans l observable affiche this film >', data);
        this.isFilmAffiche = data;
      },
      err => {
        console.log('erreur observable dans app.coments', err);
      }
    );
  } */

  clickSearch(element: any) {
    if (  element.value ) {
    this.router.navigate(['/recherche/' + element.value + '/1']);
    }
    element.value = '';
  }

  showMenu() {
    this.isShow = ! this.isShow;
    console.log(this.isShow);
  }

  recupereSpb() {
    this.inoutService.getCart().subscribe(
      data => {
        console.log('Dans main.ts : dans l observable affiche this film >', data);
        this.cart = data;
      },
      err => {
        console.log('erreur observable dans main.coments', err);
      }
    );
  }

}
