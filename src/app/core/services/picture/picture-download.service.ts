import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class PictureDownloadService {

  // liste des images selectionnées pour compression
  private pictureFiles = new BehaviorSubject<File[] | null >(null);
  readonly pictureFiles$ = this.pictureFiles.asObservable();
  
  private pictureDownloding = new BehaviorSubject<string | null>(null);
  readonly pictureDownloding$ = this.pictureDownloding.asObservable();
  
  private globalRatio = new BehaviorSubject<number>(70);
  readonly globalRatio$ = this.globalRatio.asObservable();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
  ) { }

  changeRatio(ratio: number): void {
    this.globalRatio.next(ratio);
  }

  addPictureFiles(newPictureFiles: File[]): void {
    this.pictureFiles$.pipe(
      take(1),
      map(pictureFiles => pictureFiles !== null ? [...pictureFiles, ...newPictureFiles] : newPictureFiles)
    ).subscribe(
      pictureFiles => this.pictureFiles.next(pictureFiles));
  }

  addPictureDownloading(pictureName: string | null): void {
    this.pictureDownloding.next(pictureName);
  }

  resetPictureFiles(): void {
    this.pictureFiles.next(null);
  }

  // fonction récurcive par fichiers selectionnés suivant
  downloadPicture(
    compressPictureId: string,
    userId: string,
    laps: number = 0
  ): void {
    let ratio = this.globalRatio.getValue()
    const files = this.pictureFiles.getValue();
    let file: File;

    if (files && files[laps]) {
      // selectionne le fichier suivant par tour
      file = files[laps]
    } else {
      // sortie de récurcivité si plus de fichier à télécharger
      return
    }

    let filenameExtention = file.name.split('.').pop();
    filenameExtention === 'jpeg'? filenameExtention = 'jpg': false;
    const url = `${environment.baseAPI_URL}/picture`;
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const formData = new FormData();
    
    formData.append("image", file);
    formData.append("compressRatio", ratio.toString());
    formData.append("compressPictureId", compressPictureId);
    formData.append("user_id", userId);

    // début du loader d'image
    this.addPictureDownloading(file.name);
    
    this.http.post(url, formData, httpOptions).pipe(
      catchError(error => this.errorService.handleError(error)),
    ).subscribe(_ => {
      // fin du loader d'image
      this.addPictureDownloading(null);
      // image suivante...
      laps++;
      this.downloadPicture(compressPictureId, userId, laps);
    });

  }

  deletePictureFile(filename: string): void {
    this.pictureFiles$.pipe(
      take(1),
      map(picturesFiles => picturesFiles ?
        [...picturesFiles].filter(pictureFile => pictureFile.name !== filename) :
        null
      )
    ).subscribe(
      newPicturesFiles => this.pictureFiles.next(newPicturesFiles?.length === 0? null: newPicturesFiles)
    )
  }

}
