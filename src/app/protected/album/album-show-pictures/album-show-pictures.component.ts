import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AlbumMenuService } from 'src/app/core/services/album-menu/album-menu.service';
import { AlbumPictureService } from 'src/app/core/services/album-menu/album-picture.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PictureService } from 'src/app/core/services/picture/picture.service';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'pil-album-show-pictures',
  templateUrl: './album-show-pictures.component.html',
  styleUrls: ['./album-show-pictures.component.scss']
})
export class AlbumShowPicturesComponent implements OnInit, OnDestroy {

  //unsubscribe
  currentFolderEnd$ = new Subject();

  pictures$: Observable<Picture[] | null>;

  constructor(
    private albumPictureService: AlbumPictureService,
    private authService: AuthService,
    private pictureService: PictureService,
    private albumMenuService: AlbumMenuService,
  ) { }

  ngOnInit(): void {
    this.albumMenuService.AlbumMenu();
    this.pictures$ = this.albumPictureService.pictures$;

    // récupère les images du dossier courrant
    this.albumPictureService.currentFolder$
      .pipe(
        takeUntil(this.currentFolderEnd$),
        switchMap(currentFolder => {
          const user = this.authService.currentUser;
          return this.pictureService.getPicturesByFolder(currentFolder, user?.id!);
        })
      )
      .subscribe( pictures => 
        this.albumPictureService.newPictures(pictures.length > 0 ? pictures : null));
  }

  ngOnDestroy(): void {
    this.currentFolderEnd$.next();
  }

}
