import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Picture } from 'src/app/shared/models/picture';

@Injectable({
  providedIn: 'root'
})
export class PictureSelectedService {

  private picturesSelected = new BehaviorSubject<Picture[] | null>(null);
  readonly picturesSelected$ = this.picturesSelected.asObservable();

  constructor() { }

  newPicturesSelected(picturesSelected: Picture[] | null) {
    this.picturesSelected.next(picturesSelected);
  }

  addPictureSelected(picture: Picture): void {
    this.picturesSelected$.pipe(take(1)).subscribe(
      picturesSelected =>
        this.picturesSelected.next(picturesSelected ? [ ...picturesSelected, picture ] : [picture])
    );
  };

  deletePictureSelected(picture: Picture): void {
    this.picturesSelected$.pipe(take(1)).subscribe(
      picturesSelected => {
        if (picturesSelected) {
          const newPicturesSelected = picturesSelected.filter(pictureElm => pictureElm !== picture)
          this.picturesSelected.next(newPicturesSelected.length !==0? newPicturesSelected: null);
        }
      }
    )
  }
  
}
