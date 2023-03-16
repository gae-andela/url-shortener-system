import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ToastContainerComponent } from './layouts/toast-container/toast-container.component';
import { EnsureImportedOnceModule } from './ensure-imported-once-module';
import { SharedModule } from '@src/shared/shared.module';

/**
 * Core module will be available globally
 */
@NgModule({
  declarations: [FooterComponent, NavbarComponent, ToastContainerComponent],
  exports: [NavbarComponent, FooterComponent, ToastContainerComponent],
  imports: [SharedModule, RouterModule, NgbModule],
})
export class CoreModule extends EnsureImportedOnceModule {
  public constructor(@SkipSelf() @Optional() parent: CoreModule) {
    super(parent);
  }
}
