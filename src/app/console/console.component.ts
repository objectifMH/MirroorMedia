import { Component, OnInit } from '@angular/core';
import { SpbService } from '../services/spb.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {$
  
  users;

  constructor(private spb: SpbService) { }

  ngOnInit(): void {
    this.recupereUsers();
  }


  recupereUsers() {
    this.users = this.spb.getUsers();
    console.log(this.users);

  }

}
