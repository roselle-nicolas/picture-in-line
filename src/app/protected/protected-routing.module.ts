import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProtectedComponent } from './protected.component';

const routes: Routes = [
  {
    path: 'picinline',
    component: ProtectedComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'picture-compression',
        loadChildren: () => import('./picture-compression/picture-compression.module').then(m => m.PictureCompressionModule)
      },
      {
        path: 'operation',
        loadChildren: () => import('./operation/operation.module').then(m => m.OperationModule)
      },
      {
        path: "album",
        loadChildren: () => import('./album/album.module').then(m => m.AlbumModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
