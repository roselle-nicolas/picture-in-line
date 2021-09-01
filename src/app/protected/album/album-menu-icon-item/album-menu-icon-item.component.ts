import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemMenuIcon } from 'src/app/shared/models/item-menu-icon';


@Component({
  selector: 'pil-album-menu-icon-item',
  templateUrl: './album-menu-icon-item.component.html',
  styleUrls: ['./album-menu-icon-item.component.scss']
})
export class AlbumMenuIconItemComponent {

  @Input() itemAlbulMenu: ItemMenuIcon;
  
  @Output() action = new EventEmitter<string>();

  constructor() { }

  newAction(actionName: string): void {
    this.action.emit(actionName);
  }

}
