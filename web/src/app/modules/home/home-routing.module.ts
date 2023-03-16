import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FULL_PATH_MATCH, ROUTE_PATHS } from '@src/constants/route.constant';
import { MyUrlsComponent } from '@src/modules/home/pages';

const routes: Routes = [
  {
    path: ROUTE_PATHS.default,
    children: [
      {
        path: ROUTE_PATHS.default,
        redirectTo: `/${ROUTE_PATHS.home}/${ROUTE_PATHS.myUrls}`,
        pathMatch: FULL_PATH_MATCH,
      },
      {
        path: ROUTE_PATHS.myUrls,
        component: MyUrlsComponent,
        data: {
          title: 'My URLs',
          description: 'Manage your URLs',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
