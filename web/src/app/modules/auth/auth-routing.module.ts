import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FULL_PATH_MATCH, ROUTE_PATHS } from '@src/constants/route.constant';
import { SignUpComponent, SignInComponent } from '@src/modules/auth/pages';

const routes: Routes = [
  {
    path: ROUTE_PATHS.default,
    children: [
      {
        path: ROUTE_PATHS.default,
        redirectTo: `/${ROUTE_PATHS.auth}/${ROUTE_PATHS.signIn}`,
        pathMatch: FULL_PATH_MATCH,
      },
      {
        path: ROUTE_PATHS.signIn,
        component: SignInComponent,
        data: {
          title: 'Sign In',
          description: 'Provide your credentials',
        },
      },
      {
        path: ROUTE_PATHS.signUp,
        component: SignUpComponent,
        data: { title: 'Sign Up', description: 'Register now' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
