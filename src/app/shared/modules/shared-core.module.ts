// composant et module partagé entre sharedModule et coreModule

import { NgModule } from '@angular/core';
// angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { CardMenuComponent } from '../components/card-menu/card-menu.component';
import { CommonModule } from '@angular/common';

const componentsMaterial = [
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
]

@NgModule({
  declarations: [
    CardMenuComponent,
  ],
  imports: [
    CommonModule,
    ...componentsMaterial,
  ],
  exports: [
    ...componentsMaterial,
    CardMenuComponent,
  ]
})
export class SharedCoreModule { }
