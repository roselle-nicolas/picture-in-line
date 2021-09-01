import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { UserService } from './core/services/auth/user.service';


@Component({
  selector: 'pil-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private usersService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.tryAutoLogin();
  }

  private tryAutoLogin(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    // le jeton stocké est encore valide?
    const expirationDate = +localStorage.getItem('expirationDate')!;
    const now = new Date().getTime();
    if (now >= expirationDate) return;
  
  
    // reconnexion utilisateur avec informations stockées.
    const userId: string = localStorage.getItem('userId')!;
    this.usersService.get(userId)
      .subscribe(user => {
        if(!user) return;
        
        this.authService.autoLogin(user);
      });
  }

}
