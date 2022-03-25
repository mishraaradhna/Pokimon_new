import { Component } from '@angular/core';
import { ApiServiceService } from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon';
  poke = [];

  result: any;
  offset: number = 0;
  limit: number = 20;
  constructor(private myService: ApiServiceService) { }

  getPoke(item1: any, item2: any) {
    this.myService.getPokemons(item1, item2).subscribe((item) => {
      this.result = item;
    })

  }
  onClickNext() {
    this.offset = this.offset + 20;
    this.getPoke(this.offset, this.limit);
  }

  onClickPrevious() {
    if (this.offset !== 0) {
      this.offset = this.offset - 20;
      this.getPoke(this.offset, this.limit);
    }

  }

  ngOnInit(): void {
    this.getPoke(this.offset, this.limit);
  }
}
