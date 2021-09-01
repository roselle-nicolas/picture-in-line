import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
  ) { }

  get(userId: string): Observable<User | null> {
    const url = `${environment.baseAPI_URL}/user/${userId}`;
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
     })
    };
    
    return this.http.get<any>(url, httpOptions).pipe(
      map(response => {
        const user = response.data;
        user.id = user._id;
        return user;
      }),
      catchError(error => this.errorService.handleError(error))
    )
  }
}
