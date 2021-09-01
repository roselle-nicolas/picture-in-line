import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pil-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent {

  constructor(
    private router: Router,
  ) { }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

}
