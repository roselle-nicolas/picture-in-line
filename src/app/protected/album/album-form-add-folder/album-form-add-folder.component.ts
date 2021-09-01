import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AlbumMenuService } from 'src/app/core/services/album-menu/album-menu.service';
import { AlbumPictureService } from 'src/app/core/services/album-menu/album-picture.service';
import { FolderService } from 'src/app/core/services/folder.service';
import { PictureService } from 'src/app/core/services/picture/picture.service';
import { Folder } from 'src/app/shared/models/folder';
import { Picture } from 'src/app/shared/models/picture';

@Component({
  selector: 'pil-album-form-add-folder',
  templateUrl: './album-form-add-folder.component.html',
  styleUrls: ['./album-form-add-folder.component.scss']
})
export class AlbumFormAddFolderComponent implements OnInit {

  formAddFolder: FormGroup;

  @Input() currentFolder: Folder | null;
  @Input() renameForlder: Folder | null;
  @Input() renamePicture: Picture | null;

  constructor(
    private fb: FormBuilder,
    private albumPictureService: AlbumPictureService,
    private albumMenuService: AlbumMenuService,
    private folderService: FolderService,
    private pictureService: PictureService,
  ) { }

  ngOnInit(): void {
    this.formAddFolder = this.fb.group(
      {
        'name': ['', [Validators.pattern(/^[a-zA-Z-]{1,50}$/)]]
      }
    )

    this.albumPictureService.currentFolder$.pipe(take(1))
      .subscribe(currenFolder => this.currentFolder = currenFolder)
  }

  private resetDisplay(): void {
    this.albumPictureService.onModeSelection(false);
    this.albumMenuService.AlbumMenu();
    this.albumPictureService.newCurrentFolder(this.currentFolder);
  }

  submit(): void {
    const name = this.formAddFolder.get('name')?.value;

    // modification de dossier
    if (this.renameForlder) {
      const folderUpdate = { ...this.renameForlder, name }
      const currentFolderId = this.renameForlder.repository_parent_id;

      this.folderService.updateFolder(folderUpdate, currentFolderId!)
        .subscribe( _ => {
            this.resetDisplay();
            this.albumPictureService.renameFolderSecleted(null);
            return
        });
      // modification d'image
    }else if(this.renamePicture) {
        const endOfName = this.renamePicture.name.split('-').pop();
        this.renamePicture.name = name + '-' + endOfName;
        this.renamePicture.name.split(" ").join("-");
        
        this.pictureService.updatePicture(
          this.renamePicture.repository_id!,
          "_null",
          this.renamePicture
        )
          .subscribe( _ => {
              this.resetDisplay();
              this.albumPictureService.renamePictureSecleted(null);
              return
          });
    }else {
      // ajout de dossier
      const currentFolderId = this.currentFolder? this.currentFolder._id: null;

      this.folderService.addFolder(name, currentFolderId)
        .subscribe( _ => {
          this.albumPictureService.newCurrentFolder(this.currentFolder);
          this.albumPictureService.onModeAddFolder(false);
        });
    }
  }

  cancel(): void {
    this.albumPictureService.onModeAddFolder(false);
    this.albumPictureService.renameFolderSecleted(null);
  }

}
