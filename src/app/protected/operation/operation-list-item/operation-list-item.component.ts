import { Component, Input } from '@angular/core';
import { PictureSelectedService } from 'src/app/core/services/picture/picture-selected.service';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'pil-operation-list-item',
  templateUrl: './operation-list-item.component.html',
  styleUrls: ['./operation-list-item.component.scss']
})
export class OperationListItemComponent {

  
  isPictureCheck: boolean;

  @Input() compressPicture: Picture;
  @Input() isSelectOn: boolean;

  constructor(
    private picturesSelectedService: PictureSelectedService, 
  ) { }

  // pictureOptionOn(): void {
    
  // }

  addPictureSelected(pictureSelected: Picture): void {
      this.isPictureCheck = true;
      this.picturesSelectedService.addPictureSelected(pictureSelected)
  }

  deletePictureSelected(pictureSelected: Picture): void {
      this.isPictureCheck = false;
      this.picturesSelectedService.deletePictureSelected(pictureSelected)
  }

}
