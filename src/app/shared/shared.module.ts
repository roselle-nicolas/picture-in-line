import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
//modules
import { SharedCoreModule } from './modules/shared-core.module';
// components
import { FormMessageErrorsEmailComponent } from './components/form/form-message-errors-email/form-message-errors-email.component';
import { FormMessageErrorsPasswordComponent } from './components/form/form-message-errors-password/form-message-errors-password.component';
import { FormMessageErrorsPseudoComponent } from './components/form/form-message-errors-pseudo/form-message-errors-pseudo.component';
// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const modulesMaterial = [
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatStepperModule,
  DragDropModule,
  MatSliderModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
]

@NgModule({
  declarations: [
    FormMessageErrorsEmailComponent,
    FormMessageErrorsPasswordComponent,
    FormMessageErrorsPseudoComponent,
  ],
  imports: [
    CommonModule,
    SharedCoreModule,
    ...modulesMaterial,
    FileSaverModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    SharedCoreModule,
    ...modulesMaterial,
    ReactiveFormsModule,
    FileSaverModule,
    FormMessageErrorsEmailComponent,
    FormMessageErrorsPasswordComponent,
    FormMessageErrorsPseudoComponent,
  ]
})
export class SharedModule { }
