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
  isSelectedIcon = { home: false, favoris: false, inscription: false, compte: false };

  constructor(private inoutService: InOutService, private router: Router, private tmdb: TmdbService) {
    this.inoutService.setAfficheThisFilm(null);
  }


  ngOnInit() {
    this.afficheThisFilm();
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
    console.log(this.isSelectedIcon);
  }

  afficheThisFilm() {
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
  }

  clickSearch(element: any) {
    this.router.navigate(['/recherche/' + element.value]);
    element.value = '';
  }

}
