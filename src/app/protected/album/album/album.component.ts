import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlbumPictureService } from 'src/app/core/services/album-menu/album-picture.service';
import { OperationService } from 'src/app/core/services/operation.service';
import { Folder } from 'src/app/shared/models/folder';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'pil-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {

  //unsubscribe
  currentFolderEnd$ = new Subject();
  renameFolderEnd$  = new Subject();
  renamePictureEnd$ = new Subject();

  currentFolder     : Folder | null;
  isShowFolder      : boolean; 
  isOnModeAddFolder$: Observable<boolean>;
  renameFolder      : Folder | null;
  renamePicture     : Picture | null;

  constructor(
    private albumPictureService: AlbumPictureService,
    private operationService: OperationService,
  ) { }

  ngOnInit(): void {
    this.operationService.resetCompressPicture()

    this.isOnModeAddFolder$ = this.albumPictureService.isModeAddFolder$;

    this.albumPictureService.renameFolder$.pipe(takeUntil(this.renameFolderEnd$))
    .subscribe(folder => this.renameFolder = folder);

    this.albumPictureService.renamePicture$.pipe(takeUntil(this.renamePictureEnd$))
    .subscribe( picture => this.renamePicture = picture);

    this.albumPictureService.currentFolder$.pipe(takeUntil(this.currentFolderEnd$))
    .subscribe( currentFolder => this.currentFolder = currentFolder);
  }

  ngOnDestroy(): void {
    this.currentFolderEnd$.next();
    this.renameFolderEnd$.next();
    this.renamePictureEnd$.next();
  }

  showFolder(status: boolean): void {
    if (this.isShowFolder === false && this.isShowFolder !== status) {
      this.albumPictureService.newPictures(null);
    }
    
    this.isShowFolder = status;
  }

}
