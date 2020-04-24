import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tendance-slide',
  templateUrl: './tendance-slide.component.html',
  styleUrls: ['./tendance-slide.component.scss']
})
export class TendanceSlideComponent implements OnInit {

  @Input()
  titre: string;

  constructor() { }

  ngOnInit() {
  }

}
