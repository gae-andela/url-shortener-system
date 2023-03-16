import { NgModule } from '@angular/core';
import { SignUpComponent, SignInComponent } from '@src/modules/auth/pages';
import { AuthRoutingModule } from '@src/modules/auth/auth-routing.module';
import { SharedModule } from '@src/shared/shared.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
