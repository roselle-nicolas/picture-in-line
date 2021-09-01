import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeActivityComponent } from './home-activity/home-activity.component';
import { HomeActivityCardComponent } from './home-activity-card/home-activity-card.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeActivityComponent,
    HomeActivityCardComponent
  ],
  imports: [
    SharedModule
  ]
})
export class HomeModule { }
