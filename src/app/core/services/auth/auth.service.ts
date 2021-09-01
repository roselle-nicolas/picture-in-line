import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, finalize, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error.service';
import { LoaderService } from '../loader.service';
import { MessageInfoService } from '../message-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User|null>(null);
  readonly user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router,
    private loaderService: LoaderService,
    private messageInfoService: MessageInfoService,
  ) { }

  get currentUser(): User|null {
    return this.user.getValue();
  } 

  private saveAuthData(userId: string, token: string): void {
    const expirationDate = this.getExpirationDateToken(token).toString();

    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private getExpirationDateToken(token: string): number {
    const jwtDecoded = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = jwtDecoded.exp
    
    return expirationDate * 1000;// en ms
  }

  private logoutTimer(): void {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      const expirationTime = this.getExpirationTimeToken(token); // en ms

      this.messageInfoService.showMessageInfo({
        message : `Il vous reste : ${Math.round(expirationTime/1000/60)} mn d'auto connexion.`,
        category: 'info'
      })

      of(true).pipe(
        delay(expirationTime)
      ).subscribe(_ => {
        this.logout();
        this.messageInfoService.showMessageInfo({
          message : `Votre temps de connexion est dépassé, veillez, vous reconnectez.`,
          category: 'info'
        })
      });
    }
  }

  private getExpirationTimeToken(token: string): number {
    const expirationDate = this.getExpirationDateToken(token).toString();
    const expirationTime = expirationDate? Math.round((+expirationDate - Date.now())) : 0;

    return expirationTime; // en ms
  }

  login(username: string, password: string): Observable<User | null> {
    this.loaderService.setLoading(true);

    const url: string = `${environment.baseAPI_URL}/auth/login`;
    const data = { username, password };

    return this.http.post<User>(url, data, {}).pipe(
      switchMap(
        (response: any) => {
          const user = response.data;
          const token = response.token;
          
          this.saveAuthData(user._id, token);

          this.messageInfoService.showMessageInfo(
            {
              category: 'success',
              message: 'Vous êtes connecté'
            }
          )

          const newUser = new User(
            {
              id: user._id,
              pseudo: user.username,
              email: user.email,
            }
          )
          
          return of(newUser)
        }
      ),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer()),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  autoLogin(user: User) {
    this.user.next(user);
    this.logoutTimer();
    this.router.navigate(['/picinline/album']);
  }

  register(pseudo: string, email: string, password: string): Observable<User | null> {
    this.loaderService.setLoading(true);

    const url: string = `${environment.baseAPI_URL}/auth/register`;
    const data = {
      username: pseudo,
      email,
      password,
    };
    
    return this.http.post(url, data, {}).pipe(
      switchMap((data: any) => {
        const user = new User({
          id: data._id,
          pseudo: data.pseudo,
          email: data.email,
        });

        return of(user);
       }),
      tap(_=> this.login(pseudo, password).subscribe(
        _ => this.router.navigate([''])
      )),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
     );
  }

  logout(): void {
    localStorage.removeItem('expirationDate'); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId');
    this.user.next(null);
    this.router.navigate(['/login']);
  }

}
