import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuSidebar } from 'src/app/shared/models/menu-sidbar';

@Injectable({
  providedIn: 'root'
})
export class MenuSidebarService {

  private menuSidebar: BehaviorSubject<MenuSidebar[]|null> = new BehaviorSubject<MenuSidebar[]|null>(null);
  readonly menuSidebar$: Observable<MenuSidebar[]|null> = this.menuSidebar.asObservable();

  constructor() { }

  private getMenuProtected(): MenuSidebar[] {
    return [
      {
        type: 'card-menu',
        title: 'Compresser vos images',
        path: 'picinline/picture-compression',
        picture: './assets/images/home/copress-picture.png',
        buttonContent: 'c\'est parti',
        infoCardText: [
          'Importer vos images depuis votre périphérique',
          'Nous nous chargeons du reste'
        ]
      },
      {
        type: 'card-menu',
        title: 'Contrôler vos opérations',
        path: 'picinline/operation',
        picture: './assets/images/home/chrono.png',
        buttonContent: 'contrôler',
        infoCardText: [
          'nb opération fini: 0',
          'nb d\'images fini: 0'

        ]
      },
      {
        type: 'card-menu',
        title: 'Visualiser vos images',
        path: 'picinline/album',
        picture: './assets/images/home/download.jpg',
        buttonContent: 'Explorer',
        infoCardText: [
          'nombre d\'image(s): 0',
          'nombre de dossier(s): 0',
          'espace disponible: 0mo/2go',
    
        ]
      },
    ]
  }

  getMenuPublic(): MenuSidebar[] {
    return [
      {
        title: 'Accueil',
        path: '',
        icon: 'home',
        type: 'text'
      },
      {
        title: 'Inscription',
        path: 'register',
        icon: 'account_circle',
        type: 'text'
      }
    ]
  }

  addMenuSidebar(menus: MenuSidebar[]): void {
    this.menuSidebar.next(menus);
  }

  closeMenuSidebar(): void {
    this.menuSidebar.next(null);
  }

  addMenuPublicSidebar(): void {
    this.menuSidebar.next(this.getMenuPublic());
  }
  addMenuProtectedSidebar(): void {
    this.menuSidebar.next(this.getMenuProtected());
  }
  
}
