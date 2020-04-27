import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'itunes';
  isFilmAffiche;
  isSelectedIcon = {home: false, favoris: false, inscription: false, compte: false};

  constructor() {}

}
