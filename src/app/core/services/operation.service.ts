import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DataSocket } from 'src/app/shared/models/data-socket';
import { Folder } from 'src/app/shared/models/folder';
import { Picture } from 'src/app/shared/models/picture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  //identifiant de l'opération de compression
  private compressOperationId = new BehaviorSubject<string | null>(null);
  readonly compressOperationId$ = this.compressOperationId.asObservable();

  // affichage des image d'un dossier
  private rankingPictureHidden = new BehaviorSubject<boolean>(true);
  readonly rankingPictureHidden$ = this.rankingPictureHidden.asObservable();

  // affichage des images qui viennent d'être compressé
  private compressPictures = new BehaviorSubject<Picture[] | null>(null);
  readonly compressPictures$ = this.compressPictures.asObservable();
  
  // images d'un dossier ou sous dossier selectioné
  private rankingPictures = new BehaviorSubject<Picture[] | null>(null);
  readonly rankingPictures$ = this.rankingPictures.asObservable();
  
  // sous dossier d'un dossier
  private subfoldersPicture = new BehaviorSubject<Folder[] | null>(null);
  readonly subfoldersPicture$ = this.subfoldersPicture.asObservable();

  //affichage du formulaire: ajout d'un sous dossier
  private showFormAddFolder = new BehaviorSubject<boolean>(false);
  readonly showFormAddFolder$ = this.showFormAddFolder.asObservable();
  
  // dossier courant
  private currentFolder = new BehaviorSubject<Folder | null>(null);
  readonly currentFolder$ = this.currentFolder.asObservable();

  constructor(
    private http: HttpClient,
    private fileSaverService: FileSaverService,
  ) { }

  private deletePictureAPI(picture: Picture): void {
    const url = `${environment.baseAPI_URL}/picture/${picture._id}`
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    this.http.delete(url, httpOptions).subscribe();
  }

  addNewCompressOperationId(dataCompressId: DataSocket): void {
    const compressOperationId = dataCompressId.startCompressFiles?._id

    if (compressOperationId) {
      this.compressOperationId.next(compressOperationId);
      localStorage.setItem('compressOperationId', JSON.stringify(compressOperationId));
    }
  }

  resetCompressOperationId(): void {
    this.compressOperationId.next(null);
  }

  newRankingPictures(newPictures: Picture[] | null) {
    this.rankingPictures.next(newPictures);
  }

  addNewRankingPicture(newPicture: Picture): void {
    this.rankingPictures$.pipe(
      take(1),
      map(rankingPictures => rankingPictures ? [...rankingPictures, newPicture] : [newPicture])
    ).subscribe(
      newRankingPictures => this.rankingPictures.next(newRankingPictures)
    )
  }

  hiddenRankingPicture(status: boolean): void {
    this.rankingPictureHidden.next(status);
  }
  
  addNewCompressPicture(newPicture: Picture): void {
    this.compressPictures$.pipe(
      take(1),
      map(compressPictures => compressPictures ? [...compressPictures, newPicture] : [newPicture])
    ).subscribe(
      newCompressPictures => this.compressPictures.next(newCompressPictures)
    )
  }

  deleteOneCompressPicture(picture: Picture): void {
    this.compressPictures$.pipe(
      take(1),
      map(dataPictures => dataPictures ?
        dataPictures.filter(dataPicture => dataPicture.name !== picture.name) :
        dataPictures
      )
    ).subscribe(
      newCompressPictures => {
        if (newCompressPictures) {
          this.compressPictures.next(newCompressPictures.length !== 0? newCompressPictures: null)
        }
      }
    );
  }

  resetCompressPicture(): void {
    this.compressPictures.next(null)
  }

  deletePicture(picture: Picture): void {
    this.deletePictureAPI(picture);
    this.deleteOneCompressPicture(picture);
  }

  // sauvegarde les images compressées sur le périphérique de l'utilisateur
  saveCompressPicture(picture: Picture) {
    this.http.get(picture.url, {
      observe: 'response',
      responseType: 'blob'
    }).subscribe(res => {
      this.fileSaverService.save(res.body, picture.name);
      this.deletePicture(picture);
    });
  }

  newCurrentFolder(newcurrentFolder: Folder | null): void {
    this.currentFolder.next(newcurrentFolder);
  }

  toggleFormAddFolder():void {
    this.showFormAddFolder.next(!this.showFormAddFolder.getValue());
  }

  resetFormAddFolder():void {
    this.showFormAddFolder.next(false);
  }

  newSubfoldersPicture(newFolder: Folder[]): void {
    this.subfoldersPicture.next(newFolder);
  }

}
