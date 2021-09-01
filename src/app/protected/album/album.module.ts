import { NgModule } from '@angular/core';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album/album.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlbumMenuIconComponent } from './album-menu-icon/album-menu-icon.component';
import { AlbumMenuIconItemComponent } from './album-menu-icon-item/album-menu-icon-item.component';
import { AlbumShowPicturesItemComponent } from './album-show-pictures-item/album-show-pictures-item.component';
import { AlbumShowPicturesComponent } from './album-show-pictures/album-show-pictures.component';
import { AlbumShowFolderComponent } from './album-show-folder/album-show-folder.component';
import { AlbumShowFolderItemComponent } from './album-show-folder-item/album-show-folder-item.component';
import { AlbumFormAddFolderComponent } from './album-form-add-folder/album-form-add-folder.component';


@NgModule({
  declarations: [
    AlbumComponent,
    AlbumMenuIconComponent,
    AlbumMenuIconItemComponent,
    AlbumShowPicturesItemComponent,
    AlbumShowPicturesComponent,
    AlbumShowFolderComponent,
    AlbumShowFolderItemComponent,
    AlbumFormAddFolderComponent
  ],
  imports: [
    SharedModule,
    AlbumRoutingModule
  ]
})
export class AlbumModule { }
