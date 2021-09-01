import { NgModule } from '@angular/core';

import { PictureCompressionRoutingModule } from './picture-compression-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PictureCompressionComponent } from './picture-compression/picture-compression.component';
import { PictureCompressionListComponent } from './picture-compression-list/picture-compression-list.component';
import { PictureCompressionListItemComponent } from './picture-compression-list-item/picture-compression-list-item.component';
import { PictureCompressionFormComponent } from './picture-compression-form/picture-compression-form.component';
import { PictureCompressionFormRatioComponent } from './picture-compression-form-ratio/picture-compression-form-ratio.component';
import { PictureCompressionFormSelectFilesComponent } from './picture-compression-form-select-files/picture-compression-form-select-files.component';


@NgModule({
  declarations: [
    PictureCompressionComponent,
    PictureCompressionListComponent,
    PictureCompressionListItemComponent,
    PictureCompressionFormComponent,
    PictureCompressionFormRatioComponent,
    PictureCompressionFormSelectFilesComponent
  ],
  imports: [
    SharedModule,
    PictureCompressionRoutingModule
  ]
})
export class PictureCompressionModule { }
