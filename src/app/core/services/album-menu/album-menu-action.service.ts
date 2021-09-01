import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Folder } from 'src/app/shared/models/folder';
import { Picture } from 'src/app/shared/models/picture';
import { AlbumMenuService } from './album-menu.service';
import { AlbumPictureService } from './album-picture.service';
import { DialogService } from '../dialog.service';
import { FolderService } from '../folder.service';
import { LoaderService } from '../loader.service';
import { MessageInfoService } from '../message-info.service';
import { PictureService } from '../picture/picture.service';


@Injectable({
  providedIn: 'root'
})
export class AlbumMenuActionService {

  constructor(
    private albumMenuService: AlbumMenuService,
    private folderService: FolderService,
    private albumPicureService: AlbumPictureService,
    private messageInfoService: MessageInfoService,
    private loaderService: LoaderService,
    private pictureService: PictureService,
    private dialogService: DialogService,
  ) { }

  private pastePicture(picture: Picture, newRepository_id: string | null): 
  Observable<Picture> {
    newRepository_id = newRepository_id === null ? '_null' : newRepository_id;

    const newPicture = {
      repository_id: newRepository_id!,
      user_id: picture.user_id,
      name: picture.name,
      filename: picture.filename,
      originPath : picture.originPath,
      url: picture.url,
      operation_id: picture.operation_id,
      size_in: picture.size_in,
      size_output: picture.size_output,
      compressRatio: picture.compressRatio,
      percent: picture.percent,
    } 

    return this.pictureService.createOrCopyPicture(newPicture, {copy: true})
  }

  private pasteFolder(folder: Folder, folderParent_id: string | null): 
  Observable<Folder> {
    return this.folderService.addFolder(
          folder.name!,
          folderParent_id,
          folder.project_id
        )
  }

  private ShearchItem(folderParentOrigin: Folder, folderParentCopy: Folder): void {
    // sous dossier ?
    this.folderService.getSubfolderFolderSelected({
      folderParent_id: folderParentOrigin._id!,
      project_id: null
    }).subscribe(
      folders => {
        if (folders && folders.length !== 0) {
          for (const folderItem of folders) {
            // copier le dossier
            this.pasteFolder(folderItem, folderParentCopy._id!).subscribe(
              (newFolder : Folder) => this.ShearchItem(folderItem, newFolder) // recherche de sous dossier par récursivité
            );
          }
        }
      }
    )
    //images dans le dossier
    const userId: string = localStorage.getItem('userId')!;
    this.pictureService.getPicturesByFolder(folderParentOrigin, userId).subscribe(
      pictures => {
        // copy les images
        if (pictures && pictures.length !== 0) {
          for (const picture of pictures) {
            this.pastePicture(picture, folderParentCopy._id!).subscribe();
          }
        }
      }
    )
  }

  back(currentFolder: Folder | null): void {
    if (currentFolder?.repository_parent_id || currentFolder?.repository_parent_id === null) {
      //récupère le dossier parent depuis l'api
      this.folderService.getFolder(currentFolder?.repository_parent_id).subscribe(
        newCurrentFolder => this.albumPicureService.newCurrentFolder(newCurrentFolder)
      )
    }
  }

  onModeSelection(): void {
    this.albumMenuService.albumMenuSelect();
    this.albumPicureService.onModeSelection(true);
    this.albumPicureService.newPictureSelected(null);
    this.albumPicureService.newFolderSelected(null);
    this.albumPicureService.renamePictureSecleted(null);
    this.albumPicureService.renameFolderSecleted(null);
    this.albumPicureService.onModeAddFolder(false);
  }

  offModeSelection(): void {
    this.albumMenuService.AlbumMenu();
    this.albumPicureService.onModeSelection(false);
  }

  renameItem(foldersSelected: Folder[] | null, picturesSelected: Picture[] | null): void {
    if (foldersSelected?.length === 1 && picturesSelected?.length == null) {
      this.albumPicureService.renameFolderSecleted(foldersSelected[0]);
    } else if ( picturesSelected?.length === 1 && foldersSelected?.length == null){
      this.albumPicureService.renamePictureSecleted(picturesSelected[0]);
    }else {
      this.messageInfoService.showMessageInfo({
        category: "error",
        message: "Veuillez selectionner qu'1 élement pour le renomer"
      })
    }
  }

  moveItem(): void {
    this.albumMenuService.AlbumMenuMove();
    this.albumPicureService.onModeSelection(false)
    this.albumPicureService.newCurrentFolder(null);
  }

  moveItemRtl(
    foldersSelected: Folder[] | null,
    picturesSelected: Picture[] | null,
    currentFolder: Folder | null
  ): void {
    if (picturesSelected) {
      this.loaderService.setLoading(true);
      for (const picture of picturesSelected) {
        this.pictureService.updatePicture(
          currentFolder? currentFolder._id!: '_null',
          '_null', picture
        ).subscribe(
          _ => {
            this.albumPicureService.addPicture(picture);
            this.albumPicureService.deletePictureSelected(picture);
          },
          _ => this.loaderService.setLoading(false)
        )
      }
    }
    if (foldersSelected) {
      this.loaderService.setLoading(true);
      for (const folder of foldersSelected) {
        if (folder) {
          const currentFolderId: string | null = currentFolder?._id? currentFolder?._id: null;
          this.folderService.updateFolder(folder, currentFolderId).subscribe(
            _ => {
              this.albumPicureService.addSubFolder(folder);
              this.albumPicureService.deleteFolderSelected(folder);
            },
            _ => this.loaderService.setLoading(false)
          )
        }
      }
    }
    this.albumMenuService.AlbumMenu();
  }

  deleteItem(foldersSelected: Folder[] | null, picturesSelected: Picture[] | null): void {
    const nombersOfPictureSlected = picturesSelected? picturesSelected?.length: 0;
    const numbersOfFolderSelected = foldersSelected? foldersSelected.length: 0;
    const message1 = (nombersOfPictureSlected > 0 ? `${nombersOfPictureSlected} image` : '') + ( nombersOfPictureSlected > 1 ? 's' : '');
    const message2 =   (numbersOfFolderSelected > 0 ? `${numbersOfFolderSelected} dossier` : '') + (numbersOfFolderSelected > 1 ? 's' : '');

    if (nombersOfPictureSlected === 0 && numbersOfFolderSelected === 0) return;

    this.dialogService.comfirAction({
      title: 'Supression',
      content: `Vous êtes sur le point de supprimer : ${message1} ${message1 && message2 ? ' et ' : ''} ${message2}`,
      action: 'supprimer'
    }).subscribe(
      isActionConfirm => {
        this.albumPicureService.onModeSelection(false);
        this.albumMenuService.AlbumMenu();
        // suppression d'images
        if (isActionConfirm && picturesSelected) {
          this.loaderService.setLoading(true);
          for (const picture of picturesSelected) {
            this.pictureService.deletePicture(picture._id!).subscribe(
              _ => {
                this.albumPicureService.deletePictureSelected(picture);
                this.albumPicureService.deletePicture(picture);
              },
              _ => this.loaderService.setLoading(false)
            );
          }
        }
        // suppression de dossier
        if (isActionConfirm && foldersSelected) {
          this.loaderService.setLoading(true);
          for (const folder of foldersSelected) {
            if (folder && folder._id) {
              this.folderService.deleteFolder(folder._id).subscribe(
                _ => {
                  this.albumPicureService.deleteFolderSelected(folder);
                  this.albumPicureService.deleteSubFolder(folder);
                },
                _ => this.loaderService.setLoading(false)
                
              )
            }
          }
        }
      }
    );
  }

  copyItemsSelected(): void {
    this.albumMenuService.albumMenuCopy();
    this.albumPicureService.newCurrentFolder(null);
    this.albumPicureService.onModeSelection(false);
  }

  pasteItemsSelected(
    foldersSelected: Folder[] | null,
    picturesSelected: Picture[] | null,
    currentFolder: Folder | null
  ): void {
    this.albumMenuService.AlbumMenu();

    const currentFolderId: string | null = currentFolder && currentFolder._id ? currentFolder._id : null;

    if (picturesSelected) {
      for (const picture of picturesSelected) {
        this.pastePicture(picture, currentFolderId).subscribe(
          _ => {
            this.albumPicureService.addPicture(picture);
            this.albumPicureService.deletePictureSelected(picture);
          }
        )
      }  
    }

    if (foldersSelected) {
      for (const folder of foldersSelected) {
        this.pasteFolder(folder, currentFolderId).subscribe(
          newFolder => {
            this.albumPicureService.addSubFolder(newFolder);
            this.albumPicureService.deleteFolderSelected(folder);
            this.ShearchItem(folder, newFolder);
          }
        );
      }
    }
  }

  addNewFolder(): void {
    this.albumPicureService.onModeAddFolder(true);
  }

}
