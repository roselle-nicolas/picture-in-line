import { NgModule, Optional, SkipSelf } from '@angular/core';
//module
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import { PublicModule } from '../public/public.module';
//components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoaderComponent } from './components/loader/loader.component';
//iterceptors
// import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProtectedModule } from '../protected/protected.module';
import { SharedCoreModule } from '../shared/modules/shared-core.module';
//agular material
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PictureFullSreenComponent } from './components/picture-full-sreen/picture-full-sreen.component';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

const modulesMaterial = [
  MatSliderModule,
  MatToolbarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
]
@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,
    LoaderComponent,
    PictureFullSreenComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    SharedCoreModule,
    HttpClientModule,
    ...modulesMaterial,
    PublicModule,
    ProtectedModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  exports: [
    SharedCoreModule,
    ...modulesMaterial,
    NavbarComponent,
    SidenavComponent,
    LoaderComponent,
    PictureFullSreenComponent,
    DialogComponent,
  ],
  // providers: [
  //   {
  //    provide: HTTP_INTERCEPTORS,
  //    useClass: AuthInterceptor,
  //    multi: true
  //   }
  //  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
