import { Component, OnInit } from '@angular/core';
import { InOutService } from './in-out.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'itunes';
  isFilmAffiche;
  isSelectedIcon = {home: false, favoris: false, inscription: false, compte: false};

  constructor(private inoutService: InOutService, private router: Router) { }


  ngOnInit() {
    this.afficheFilm();
    this.afficheThisFilm();
  }

  afficheFilm(): void {
    /* console.log('Dans App.component.ts : ', ' bien arrivé');
    this.inoutService.getAfficheFilm().subscribe(
      data => {
        console.log('Dans App.component.ts : dans l observable' , data);
        this.isFilmAffiche = of(data)['value'];
        console.log('res ', this.isFilmAffiche);
      },
      err => {
        console.log('erreur observable dans app.coments', err);
      }
    ); */
  }

  clickIcon(li) {
    const attr = li.getAttribute('data-icon');
    // tslint:disable-next-line:forin
    for (const icon in this.isSelectedIcon) {
        this.isSelectedIcon[icon] = false;
        if ( icon === attr) {
        this.isSelectedIcon[icon] = true;
        }

    }
    console.log(this.isSelectedIcon);
  }

  afficheThisFilm() {
    console.log('Dans App.component.ts : afficheThisFilm on souscrit à l observable > ');
    this.inoutService.getAfficheThisFilm().subscribe(
      data => {
        console.log('Dans App.component.ts : dans l observable affiche this film >' , data);
        this.isFilmAffiche = data;
      },
      err => {
        console.log('erreur observable dans app.coments', err);
      }
    );
  }

  clickSearch(element: any) {
    console.log(element.value);
    this.inoutService.setRechercheInput(element.value);
    this.router.navigate(['/recherche']);
  }

}
