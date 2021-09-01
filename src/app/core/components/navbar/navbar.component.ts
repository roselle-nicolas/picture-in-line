import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuSidebar } from 'src/app/shared/models/menu-sidbar';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../../services/auth/auth.service';
import { MenuSidebarService } from '../../services/menuSidebar.service';

@Component({
  selector: 'pil-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  user: User | null;
  subsciption: Subscription;
  menuPublic: MenuSidebar[];
  
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuSlidebarService: MenuSidebarService,
  ) { }

  ngOnInit(): void { 
    this.subsciption = this.authService.user$.subscribe(user => this.user = user);
    this.menuPublic = this.menuSlidebarService.getMenuPublic();
  }

  ngOnDestroy(): void {
    this.subsciption.unsubscribe();
  }

  onSidenavToggle(): void {
    this.sidenavToggle.emit()
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
