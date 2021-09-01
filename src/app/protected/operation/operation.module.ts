import { NgModule } from '@angular/core';
import { OperationRoutingModule } from './operation-routing.module';
import { OperationComponent } from './operation/operation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OperationListItemComponent } from './operation-list-item/operation-list-item.component';
import { OperationListFolderComponent } from './operation-list-folder/operation-list-folder.component';
import { OperationFormAddFolderComponent } from './operation-form-add-folder/operation-form-add-folder.component';
import { OperationFolderNavigationComponent } from './operation-folder-navigation/operation-folder-navigation.component';


@NgModule({
  declarations: [
    OperationComponent,
    OperationListItemComponent,
    OperationListFolderComponent,
    OperationFormAddFolderComponent,
    OperationFolderNavigationComponent,
  ],
  imports: [
    SharedModule,
    OperationRoutingModule
  ]
})
export class OperationModule { }
