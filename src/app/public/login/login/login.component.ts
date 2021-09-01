import { Component, OnInit } from '@angular/core';
import { MenuSidebarService } from 'src/app/core/services/menuSidebar.service';

@Component({
  selector: 'pil-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private menuSidebarService: MenuSidebarService,
  ) { }

  ngOnInit(): void {
    this.menuSidebarService.addMenuPublicSidebar();
  }

}
