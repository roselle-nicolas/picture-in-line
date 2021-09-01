import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlbumPictureService } from 'src/app/core/services/album-menu/album-picture.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Folder } from 'src/app/shared/models/folder';

@Component({
  selector: 'pil-album-show-folder-item',
  templateUrl: './album-show-folder-item.component.html',
  styleUrls: ['./album-show-folder-item.component.scss']
})
export class AlbumShowFolderItemComponent implements OnInit, OnDestroy {

  //unsubscribe
  isModeSelectionEnd$= new Subject();

  isModeSelection: boolean;
  isFolderSelected: boolean;

  @Input() folder: Folder | null;

  constructor(
    private albumPictureService: AlbumPictureService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.albumPictureService.isModeSelection$.pipe(
      takeUntil(this.isModeSelectionEnd$)
    ).subscribe(
      isModeSelection => {
        this.isModeSelection = isModeSelection;
        this.isFolderSelected = false;
      }
    );

    this.isFolderSelected = false;
  }

  ngOnDestroy(): void {
    this.isModeSelectionEnd$.next();
  }

  private toggleSelectFolder(folder: Folder | null): void {
    if (!this.isFolderSelected && folder) {
      this.albumPictureService.addFolderSelected(folder);
    }

    if (this.isFolderSelected && folder) {
      this.albumPictureService.deleteFolderSelected(folder);
    }
    
    this.isFolderSelected = !this.isFolderSelected;
  }

  selectFolder(folder: Folder | null): void {
    if (this.isModeSelection) {
      this.toggleSelectFolder(folder);
    } else {
      this.loaderService.setLoading(true);
      this.albumPictureService.newCurrentFolder(folder);
    }
  }

}
