import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Folder } from 'src/app/shared/models/folder';
import { Picture } from 'src/app/shared/models/picture';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
    ) { }

  createOrCopyPicture(newPicture: Picture, option: any = {}): Observable<Picture> {
    const url = option.copy ? `${environment.baseAPI_URL}/picture?copy=true` : `${environment.baseAPI_URL}/picture`

    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    return this.http.post<Picture>(url, newPicture, httpOptions).pipe(
      catchError(error => this.errorService.handleError(error))
    )
  }

  updatePicture(
    repository_id: string,
    projectId: string,
    picture: Picture,
  ): Observable<Picture> {
      const url = `${environment.baseAPI_URL}/picture/${picture._id}`;
      const newPicture = {
        ...picture,
        repository_id,
        project_id: projectId,
      }
      const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      };

      return this.http.put<Picture>(url, newPicture, httpOptions).pipe(
        map((response: any) => response.data),
        catchError(error => this.errorService.handleError(error))
      )
  }

  getPicturesByFolder(folderSelected: Folder | null, user_id: string ): Observable<Picture[]> {
    const repository_id = folderSelected?._id? folderSelected._id : "_null";
    const query = `?user_id=${user_id}&repository_id=${repository_id}`;
    const url = `${environment.baseAPI_URL}/picture${query}`;

    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    return this.http.get<Picture[]>(url, httpOptions).pipe(
      map((response: any) => response.data),
      catchError(error => this.errorService.handleError(error))
    )
  }

  deletePicture(pictureId: string): Observable<object> {
    const url = `${environment.baseAPI_URL}/picture/${pictureId}`;
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    
    return this.http.delete<Picture[]>(url, httpOptions).pipe(
      catchError(error => this.errorService.handleError(error))
    )
  }

}
