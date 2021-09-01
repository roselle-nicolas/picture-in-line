import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MenuSidebarService } from 'src/app/core/services/menuSidebar.service';

@Component({
  selector: 'pil-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private meunuSidebarService: MenuSidebarService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.authService.user$.pipe(
      take(1),
    ).subscribe(
      user => user? this.meunuSidebarService.addMenuProtectedSidebar(): this.meunuSidebarService.addMenuPublicSidebar()
    )
  }

}
