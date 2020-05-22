import { Component, OnInit } from '@angular/core';
import { InOutService } from '../in-out.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  title = 'NetFilm';
  isFilmAffiche;
  isSelectedIcon = {home: false, favoris: false, inscription: false, compte: false};

  constructor(private inoutService: InOutService, private router: Router) { 
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
        if ( icon === attr) {
        this.isSelectedIcon[icon] = true;
        }

    }
    //console.log(this.isSelectedIcon);
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
    element.value = '';
  }

}
