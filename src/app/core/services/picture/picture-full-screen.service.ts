import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Picture } from 'src/app/shared/models/picture';

@Injectable({
  providedIn: 'root'
})
export class PictureFullScreenService {

  private pictureFullScreen = new BehaviorSubject<Picture | null>(null);
  readonly pictureFullScreen$ = this.pictureFullScreen.asObservable();

  constructor() { }

  newPictureFullScreen(picture: Picture | null): void {
    this.pictureFullScreen.next(picture);
  }
}
