import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MenuSidebar } from 'src/app/shared/models/menu-sidbar';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../../services/auth/auth.service';
import { MenuSidebarService } from '../../services/menuSidebar.service';

@Component({
  selector: 'pil-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  //unsubscribe
  userEnd$ = new Subject();

  menus$: Observable<MenuSidebar[]|null>;
  user: User | null;

  @Output() sidenaveClose = new EventEmitter<void>();
  
  constructor(
    private menuSidebarService: MenuSidebarService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.menus$ = this.menuSidebarService.menuSidebar$
    this.authService.user$.pipe(
      takeUntil(this.userEnd$)
    ).subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy(): void {
    this.userEnd$.next();
  }
  
  navigate(path: string): void {
    this.sidenaveClose.emit();
   this.router.navigate([path]);
  }
}
