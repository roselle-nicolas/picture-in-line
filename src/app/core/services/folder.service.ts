import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Folder } from 'src/app/shared/models/folder';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private authService: AuthService,
  ) { }

  addFolder(  
    newFolderName: string,
    parentFolderId: string | null = null,
    projectId: string | null = null
  ): Observable<Folder> {
      const user = this.authService.currentUser;
      const url = `${environment.baseAPI_URL}/repository`;
      const folder = {
        name: newFolderName,
        user_id: user?.id,
        repository_parent_id: parentFolderId,
        project_id: projectId
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      };

      return this.http.post<Folder>(url, folder, httpOptions).pipe(
        map((response : any) => response.data),
        catchError(error => this.errorService.handleError(error))
      )
  }

  getSubfolderFolderSelected(folder: Folder): Observable<Folder[]> {
      const user = this.authService.currentUser;
      const query = `user_id=${user?.id}&repository_parent_id=${folder.folderParent_id}`
      const url = `${environment.baseAPI_URL}/repository?${query}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      };

      return this.http.get<any>(url, httpOptions).pipe(
        map(response => response.data),
        catchError(error => this.errorService.handleError(error))
      )
  }

  getFolder(folderId: string | null): Observable<Folder | null> {
      if (!folderId) return of(null);

      const url = `${environment.baseAPI_URL}/repository/${folderId}`;
      const httpOptions = {
        headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      };

      return this.http.get<Folder>(url, httpOptions).pipe(
        map((response: any) => response.data),
        catchError(error => this.errorService.handleError(error))
      )
  }

  updateFolder(folder: Folder, currentFolderId: string | null): Observable<object> {
    const url = `${environment.baseAPI_URL}/repository/${folder._id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const newFolder = { ...folder, repository_parent_id: currentFolderId }

    return this.http.put(url, newFolder, httpOptions).pipe(
      catchError(error => this.errorService.handleError(error))
    )

  }

  deleteFolder(folderId: string): Observable<object> {
    const url = `${environment.baseAPI_URL}/repository/${folderId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    return this.http.delete(url, httpOptions).pipe(
      catchError(error => this.errorService.handleError(error))
    )
  }

}
