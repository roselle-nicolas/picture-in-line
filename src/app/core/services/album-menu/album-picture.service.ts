import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Folder } from 'src/app/shared/models/folder';
import { Picture } from 'src/app/shared/models/picture';

@Injectable({
  providedIn: 'root'
})
export class AlbumPictureService {

  private pictures = new BehaviorSubject<Picture[] | null>(null);
  readonly pictures$ = this.pictures.asObservable();
  
  private currentFolder = new BehaviorSubject<Folder | null>(null);
  readonly currentFolder$ = this.currentFolder.asObservable();

  private subfoldersPicture = new BehaviorSubject<Folder[] | null>(null);
  readonly subfoldersPicture$ = this.subfoldersPicture.asObservable();

  private picturesSelected = new BehaviorSubject<Picture[] | null>(null);
  readonly picturesSelected$ = this.picturesSelected.asObservable();
  
  private folderSelected = new BehaviorSubject<Folder[] | null>(null);
  readonly folderSelected$ = this.folderSelected.asObservable();

  private isModeSelection = new BehaviorSubject<boolean>(false);
  readonly isModeSelection$ = this.isModeSelection.asObservable();

  private isModeAddFolder = new BehaviorSubject<boolean>(false);
  readonly isModeAddFolder$ = this.isModeAddFolder.asObservable();
  
  private renameFolder = new BehaviorSubject<Folder | null>(null);
  readonly renameFolder$ = this.renameFolder.asObservable();

  private renamePicture = new BehaviorSubject<Picture | null>(null);
  readonly renamePicture$ = this.renamePicture.asObservable();

  constructor() { }

  newPictures(pictures: Picture[] | null): void {
    this.pictures.next(pictures);
  }

  addPicture(newPictures:Picture): void {
    const pictures = this.pictures.getValue();

    pictures ?
      this.pictures.next([...pictures, newPictures]) :
      this.pictures.next([newPictures]);
  }

  deletePicture(picture: Picture): void {
    const currentPictures = this.pictures.getValue();

    if (currentPictures) {
      const newPictures = currentPictures.filter(pictureItem => pictureItem._id !== picture._id);
      this.pictures.next(newPictures);
    }
  }

  newCurrentFolder(folder: Folder | null): void {
    this.currentFolder.next(folder);
  }

  newSubfoldersPicture(newFolder: Folder[] | null): void {
    this.subfoldersPicture.next(newFolder);
  }

  addSubFolder(newSubFolder: Folder): void {
    const subFolder = this.subfoldersPicture.getValue();

    subFolder ?
      this.subfoldersPicture.next([...subFolder, newSubFolder]) :
      this.subfoldersPicture.next([newSubFolder])
  }

  deleteSubFolder(folder: Folder): void {
    const currentSubFolder = this.subfoldersPicture.getValue();
    if (currentSubFolder) {
      const newSubFolder = currentSubFolder.filter(folderItem => folderItem._id !== folder._id);
      this.subfoldersPicture.next(newSubFolder);
    }
  }

  newPictureSelected(pituresSelected: Picture[] | null): void {
    this.picturesSelected.next(pituresSelected);
  }

  addPictureSelected(picture: Picture) : void {
    const picturesSelected = this.picturesSelected.getValue();

    if (picturesSelected) {
      const newPicturesSelected = [ ...picturesSelected, picture ];
      this.picturesSelected.next(newPicturesSelected);
    }else {
      this.picturesSelected.next([picture]);
    }
  }

  deletePictureSelected(picture: Picture): void {
    const picturesSelected = this.picturesSelected.getValue()

    if (picturesSelected) {
      const newPicturesSelected = picturesSelected.filter(pictureItem => pictureItem._id !== picture._id);
      this.picturesSelected.next(newPicturesSelected.length !== 0? newPicturesSelected: null);
    }
  }

  newFolderSelected(foldersSelected: Folder[] | null): void {
    this.folderSelected.next(foldersSelected);
  }

  addFolderSelected(folder: Folder) : void {
    const foldersSelected = this.folderSelected.getValue();
    if (foldersSelected) {
      const newFolderSelected = [ ...foldersSelected, folder ];
      this.folderSelected.next(newFolderSelected);
    }else {
      this.folderSelected.next([folder]);
    }
  }

  deleteFolderSelected(folder: Folder): void {
    const foldersSelected = this.folderSelected.getValue()
    
    if (foldersSelected) {
      const newFolderSelected = foldersSelected.filter(folderItem => folderItem._id !== folder._id);
      this.folderSelected.next(newFolderSelected.length !== 0? newFolderSelected: null);
    }
  }

  onModeSelection(status: boolean): void {
    this.isModeSelection.next(status);
  }

  onModeAddFolder(status: boolean): void {
    this.isModeAddFolder.next(status)
  }

  renameFolderSecleted(data: Folder | null): void {
    this.renameFolder.next(data);
  }
  renamePictureSecleted(data: Picture | null): void {
    this.renamePicture.next(data);
  }
}
