import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuSidebarService } from '../core/services/menuSidebar.service';
import { MenuSidebar } from '../shared/models/menu-sidbar';

@Component({
  selector: 'pil-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {

  menus$: Observable<MenuSidebar[] | null>;

  constructor(
    private menuSidebarService: MenuSidebarService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.menuSidebarService.addMenuProtectedSidebar();
    this.menus$ = this.menuSidebarService.menuSidebar$;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

}
