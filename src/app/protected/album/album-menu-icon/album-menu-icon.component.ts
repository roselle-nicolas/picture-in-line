import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlbumMenuService } from 'src/app/core/services/album-menu/album-menu.service';
import { AlbumMenuActionService } from 'src/app/core/services/album-menu/album-menu-action.service';
import { AlbumPictureService } from 'src/app/core/services/album-menu/album-picture.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MessageInfoService } from 'src/app/core/services/message-info.service';
import { Folder } from 'src/app/shared/models/folder';
import { ItemMenuIcon } from 'src/app/shared/models/item-menu-icon';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'pil-album-menu-icon',
  templateUrl: './album-menu-icon.component.html',
  styleUrls: ['./album-menu-icon.component.scss']
})
export class AlbumMenuIconComponent implements OnInit, OnDestroy {

  //unsubscribe
  currentFolderEnd$ = new Subject();
  picturesSelectedEnd$ = new Subject();
  foldersSelectedEnd$ = new Subject();

  albumMenu$: Observable<ItemMenuIcon[] | null>;
  currentFolder: Folder | null;
  picturesSelected: Picture[] | null;
  foldersSelected: Folder[] | null;

  constructor(
    private albumMenuService: AlbumMenuService,
    private albumPicureService: AlbumPictureService,
    private messageInfoService: MessageInfoService,
    private loaderService: LoaderService,
    private albumMenuActionService: AlbumMenuActionService,
  ) { }

  ngOnInit(): void {
    this.albumMenu$ = this.albumMenuService.albumMenu$;

    this.albumPicureService.currentFolder$
      .pipe(takeUntil(this.currentFolderEnd$))
      .subscribe( currentFolder => this.currentFolder = currentFolder);
    
    this.albumPicureService.picturesSelected$
      .pipe(takeUntil(this.picturesSelectedEnd$))
      .subscribe(picturesSelected => {
        this.picturesSelected = picturesSelected;

        if ( !this.picturesSelected && !this.foldersSelected) {
          this.loaderService.setLoading(false);
        }
      }
    );

    this.albumPicureService.folderSelected$
      .pipe(takeUntil(this.foldersSelectedEnd$))
      .subscribe(foldersSelected => {
        this.foldersSelected = foldersSelected;

        if ( !this.picturesSelected && !this.foldersSelected) {
          this.loaderService.setLoading(false);
        }
      }
    );
      
  }

  ngOnDestroy(): void {
    this.currentFolderEnd$.next();
    this.picturesSelectedEnd$.next();
    this.foldersSelectedEnd$.next();
  }

  newAction(actionName: string): void {
    switch (actionName) {
      case 'toggleVue':
        this.messageInfoService.showMessageInfo({
          category: 'info',
          message : 'Fonctionnalité en cours de développement',
        })
      break;

      case 'back-all':
        this.albumPicureService.newCurrentFolder(null);
      break;

      case 'back':
        this.albumMenuActionService.back(this.currentFolder);
      break;

      case 'mode-selection-on':
        this.albumMenuActionService.onModeSelection();
      break;
      
      case 'mode-selection-off':
        this.albumMenuActionService.offModeSelection();
      break;

      case 'rename-item':
        this.albumMenuActionService.renameItem(
            this.foldersSelected,
            this.picturesSelected
        );
      break;

      case 'move-item':
        this.albumMenuActionService.moveItem();
      break;

      case 'move-item-rtl':
        this.albumMenuActionService.moveItemRtl(
          this.foldersSelected,
          this.picturesSelected,
          this.currentFolder
        );
      break;

      case 'copy-pictures':
          this.albumMenuActionService.copyItemsSelected();
      break;

      case 'paste-pictures':
        this.albumMenuActionService.pasteItemsSelected(
          this.foldersSelected,
          this.picturesSelected,
          this.currentFolder
        );
      break;

      case 'delete-item':
        this.albumMenuActionService.deleteItem(
          this.foldersSelected,
          this.picturesSelected
        );
      break;

      case 'add-folder':
        this.albumMenuActionService.addNewFolder();
      break;

      default:
        break;
    }
  }
}
