import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Picture } from 'src/app/shared/models/picture';
import { PictureFullScreenService } from '../../services/picture/picture-full-screen.service';

@Component({
  selector: 'pil-picture-full-sreen',
  templateUrl: './picture-full-sreen.component.html',
  styleUrls: ['./picture-full-sreen.component.scss']
})
export class PictureFullSreenComponent implements OnInit, OnDestroy {


  //unsubscribe
  pictureFullScreenEnd$ = new Subject

  picture: Picture | null;

  constructor(
    private pictureFullScreenService: PictureFullScreenService,
  ) { }

  ngOnInit(): void {
    this.pictureFullScreenService.pictureFullScreen$.pipe(
      takeUntil(this.pictureFullScreenEnd$)
    ).subscribe(
      picture => {
          this.picture = picture
      }
    );
  }

  ngOnDestroy(): void {
    this.pictureFullScreenEnd$.next();
  }

  closePictureFullScreen(): void {
    this.pictureFullScreenService.newPictureFullScreen(null);
  }

}
