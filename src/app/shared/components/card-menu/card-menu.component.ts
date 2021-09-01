import { Component, Input } from '@angular/core';

@Component({
  selector: 'pil-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent {

  @Input() buttonTextContent: string;
  @Input() cardMenuTitle: string;
  @Input() cardPicture: string;
  @Input() infoCardText: string[];

  constructor() { }

}
