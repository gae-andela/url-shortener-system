import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTE_PATHS, FULL_PATH_MATCH } from '@src/constants/index';
import { AuthenticatedGuard } from '@src/core/guards';

/**
 * We will use lazy loading here in order to improve performances;
 * A module JS will be loaded only if user access a page/component requiring it
 */
const routes: Routes = [
  {
    path: ROUTE_PATHS.auth,
    data: { expectUser: false },
    canActivateChild: [AuthenticatedGuard],
    loadChildren: () =>
      import('@src/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ROUTE_PATHS.home,
    data: { expectUser: true },
    canActivateChild: [AuthenticatedGuard],
    loadChildren: () =>
      import('@src/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: ROUTE_PATHS.default,
    redirectTo: ROUTE_PATHS.auth,
    pathMatch: FULL_PATH_MATCH,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
