import { NgModule } from '@angular/core';
import { MyUrlsComponent } from '@src/modules/home/pages';
import { HomeRoutingModule } from '@src/modules/home/home-routing.module';
import { SharedModule } from '@src/shared/shared.module';
import {
  CreateUrlDialogComponent,
  RemoveUrlDialogComponent,
  UrlStatsDialogComponent,
} from '@src/modules/home/components';

@NgModule({
  declarations: [
    MyUrlsComponent,
    RemoveUrlDialogComponent,
    CreateUrlDialogComponent,
    UrlStatsDialogComponent,
  ],
  imports: [SharedModule, HomeRoutingModule],
})
export class HomeModule {}
