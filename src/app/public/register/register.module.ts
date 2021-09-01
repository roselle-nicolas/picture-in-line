//module
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
//component
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent,
  ],
  imports: [
    SharedModule,
    RegisterRoutingModule,
  ],
  exports: [
  ]
})
export class RegisterModule { }
