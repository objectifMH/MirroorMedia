import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/film';
import { InOutService } from '../in-out.service';
@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
  @Input()
  film: Film;
  cheminImgSrc = '../../assets/CoverFilm/AfficheFilm/';
  constructor(private inoutService: InOutService) { }
  ngOnInit() {
  }
  closeAffiche() {
    this.inoutService.setAfficheThisFilm(null);
  }
}