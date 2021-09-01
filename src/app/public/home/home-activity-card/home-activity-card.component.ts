import { Component, Input } from '@angular/core';

@Component({
  selector: 'pil-home-activity-card',
  templateUrl: './home-activity-card.component.html',
  styleUrls: ['./home-activity-card.component.scss']
})
export class HomeActivityCardComponent {

  @Input() titleCard: string
  @Input() imageSrc: string
  @Input() textContent: string

  constructor() { }

}
