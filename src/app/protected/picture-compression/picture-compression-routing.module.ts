import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PictureCompressionComponent } from './picture-compression/picture-compression.component';

const routes: Routes = [
  { path: '', component: PictureCompressionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PictureCompressionRoutingModule { }
