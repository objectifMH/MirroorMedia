import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Film } from 'src/film';
import { InOutService } from '../in-out.service';

@Component({
  selector: 'app-tendance-slide',
  templateUrl: './tendance-slide.component.html',
  styleUrls: ['./tendance-slide.component.scss']
})
export class TendanceSlideComponent implements OnInit {

  @Input()
  titre: string;

  @Output()
  filmOutput = new EventEmitter();

  films: Film[] = [];


  constructor(private inoutService: InOutService) { }

  ngOnInit() {
    this.films = this.inoutService.listeFilmBD;
  }

  clickFilmSlide(film) {
    console.log('Dans tendanceSlide :', film);
    this.filmOutput.emit(film);
  }
}
