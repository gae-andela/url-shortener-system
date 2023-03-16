import { Component, Inject } from '@angular/core';
import { WINDOW_TOKEN } from '@src/constants/token.constant';
import { StorageService } from '@src/core/services/local';
import { WithCurrentUser, WithHooks } from '@src/shared/mixins';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends WithCurrentUser(WithHooks()) {
  collapsed = true; // Useful in small screens!

  constructor(
    private _storageService: StorageService,
    @Inject(WINDOW_TOKEN) private _window: Window
  ) {
    super(_storageService);
  }

  onLogout(): void {
    this._storageService.accessToken = null;
    this._storageService.user = null;
    this._window.location.reload();
  }
}
