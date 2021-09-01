import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AlbumPictureService } from 'src/app/core/services/album-menu/album-picture.service';
import { FolderService } from 'src/app/core/services/folder.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Folder } from 'src/app/shared/models/folder';

@Component({
  selector: 'pil-album-show-folder',
  templateUrl: './album-show-folder.component.html',
  styleUrls: ['./album-show-folder.component.scss']
})
export class AlbumShowFolderComponent implements OnInit, OnDestroy {

  // unsubscribe
  currentFolderEnd$ = new Subject();

  subFolders$: Observable<Folder[] | null>

  constructor(
    private albumPictureService: AlbumPictureService,
    private folderService: FolderService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.albumPictureService.newCurrentFolder(null);
    this.subFolders$ = this.albumPictureService.subfoldersPicture$;

    // récupère les sous dossiers
    this.albumPictureService.currentFolder$
      .pipe(
        takeUntil(this.currentFolderEnd$),
        tap(_ => this.loaderService.setLoading(true)),
        switchMap(currentFolder => {
          const folderParent_id = currentFolder && currentFolder._id ? currentFolder._id : null;
          return this.folderService.getSubfolderFolderSelected({ folderParent_id })
            .pipe(finalize(() => this.loaderService.setLoading(false)))
        })
      )
      .subscribe(subFolders =>
        this.albumPictureService.newSubfoldersPicture(subFolders.length > 0 ? subFolders : null)
      );
    
  }

  ngOnDestroy(): void {
    this.currentFolderEnd$.next();
  }

}
