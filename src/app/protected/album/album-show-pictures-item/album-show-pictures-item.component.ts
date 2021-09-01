import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlbumPictureService } from 'src/app/core/services/album-menu/album-picture.service';
import { PictureFullScreenService } from 'src/app/core/services/picture/picture-full-screen.service';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'pil-album-show-pictures-item',
  templateUrl: './album-show-pictures-item.component.html',
  styleUrls: ['./album-show-pictures-item.component.scss']
})
export class AlbumShowPicturesItemComponent implements OnInit {

  // unsubscribe
  isModeSelectionEnd$ = new Subject();

  isModeSelection: boolean;
  isPictureSelected: boolean;

  @Input() picture: Picture | null;

  constructor(
    private albumPictureService: AlbumPictureService,
    private pictureFullScreenService: PictureFullScreenService,
  ) { }

  ngOnInit(): void {
    this.albumPictureService.isModeSelection$
      .pipe(takeUntil(this.isModeSelectionEnd$))
      .subscribe(isModeSelection => {
        this.isModeSelection = isModeSelection
        this.isPictureSelected = false;
      });
    // vide la selection d'image  
    this.isPictureSelected = false;
  }

  private toggleSelectPicture(picture: Picture | null): void {
    if (!this.isPictureSelected && picture) {
      this.albumPictureService.addPictureSelected(picture);
    }
    if (this.isPictureSelected && picture) {
      this.albumPictureService.deletePictureSelected(picture);
    }
    this.isPictureSelected = !this.isPictureSelected;
  }

  selectPicture(picture: Picture | null): void {
    this.isModeSelection?
      this.toggleSelectPicture(picture) :
      this.pictureFullScreenService.newPictureFullScreen(picture);
  }

}
