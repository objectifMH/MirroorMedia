import { Component, OnInit } from '@angular/core';
import { InOutService } from './in-out.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'itunes';
  isFilmAffiche;
  isSelectedIcon = {home: false, favoris: false, inscription: false, compte: false};

  constructor(private inoutService: InOutService) { }


  ngOnInit() {
    this.afficheFilm();
  }

  afficheFilm(): void {
    console.log('Dans App.component.ts : ', ' bien arrivé');
    this.inoutService.getAfficheFilm().subscribe(
      data => {
        console.log('Dans App.component.ts : dans l observable' , data);
        this.isFilmAffiche = of(data)['value'];
        console.log('res ', this.isFilmAffiche);
      },
      err => {
        console.log('erreur observable dans app.coments', err);
      }
    );
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


}
