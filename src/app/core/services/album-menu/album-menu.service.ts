import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemMenuIcon } from 'src/app/shared/models/item-menu-icon';

@Injectable({
  providedIn: 'root'
})
export class AlbumMenuService {

  private albumMenu = new BehaviorSubject<ItemMenuIcon[] | null>(null);
  readonly albumMenu$ = this.albumMenu.asObservable();
 
  constructor() { }

  newAlbumMenu(albumMenu: ItemMenuIcon[] | null) {
    this.albumMenu.next(albumMenu);
  }

  AlbumMenu(): void {
    const albumMenu = [
      {
        title: "Vue",
        action: "toggleVue",
        icon: "view_quilt",
      },
      {
        title: "Début",
        action: "back-all",
        icon: "reply_all",
      },
      {
        title: "Retour",
        action: "back",
        icon: "reply",
      },
      {
        title: "Selection",
        action: "mode-selection-on",
        icon: "check_box",
      },
      {
        title: "Ajouter",
        action: "add-folder",
        icon: "create_new_folder",
      },
    ]

    this.newAlbumMenu(albumMenu);
  }

  albumMenuSelect(): void {
    const albumMenu = [
      {
        title: "Vue",
        action: "toggleVue",
        icon: "view_quilt",
      },
      {
        title: "Début",
        action: "back-all",
        icon: "reply_all",
      },
      {
        title: "Retour",
        action: "back",
        icon: "reply",
      },
      {
        title: "Selection",
        action: "mode-selection-off",
        icon: "check_box",
      },
      {
        title: "Renomer",
        action: "rename-item",
        icon: "drive_file_rename_outline",
      },
      {
        title: "déplacer",
        action: "move-item",
        icon: "drive_file_move",
      },
      {
        title: "Copier",
        action: "copy-pictures",
        icon: "content_copy",
      },
      {
        title: "Effacer",
        action: "delete-item",
        icon: "delete_forever",
      },
    ]

    this.newAlbumMenu(albumMenu);
  }

  AlbumMenuMove(): void {
    const albumMenu = [
      {
        title: "Vue",
        action: "toggleVue",
        icon: "view_quilt",
      },
      {
        title: "Début",
        action: "back-all",
        icon: "reply_all",
      },
      {
        title: "Retour",
        action: "back",
        icon: "reply",
      },
      {
        title: "déplacer",
        action: "move-item-rtl",
        icon: "drive_file_move_rtl",
      },
    ]

    this.newAlbumMenu(albumMenu);
  }

  albumMenuCopy(): void {
    const albumMenu = [
      {
        title: "Vue",
        action: "toggleVue",
        icon: "view_quilt",
      },
      {
        title: "Début",
        action: "back-all",
        icon: "reply_all",
      },
      {
        title: "Retour",
        action: "back",
        icon: "reply",
      },
      {
        title: "Coller",
        action: "paste-pictures",
        icon: "content_paste",
      },
    ]

    this.newAlbumMenu(albumMenu);
  }

}
