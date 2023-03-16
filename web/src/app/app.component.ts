import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount } from '@src/types/index';
import { AuthService } from '@src/core/services/api';
import { StorageService } from '@src/core/services/local';
import { WithHooks, WithTitle } from '@src/shared/mixins';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends WithTitle(WithHooks()) {
  constructor(
    protected _router: Router,
    protected _titleService: Title,
    protected _activatedRoute: ActivatedRoute,
    protected _authService: AuthService,
    protected _storageService: StorageService
  ) {
    super(_storageService, _titleService, _activatedRoute, _router);
    this._loadCurrentUser();
  }

  private _loadCurrentUser(): void {
    if (!this._storageService.accessToken) {
      return;
    }
    this._authService.who().subscribe({
      next: (user: UserAccount) => {
        this._storageService.user = user;
      },
      error: (error: any) => {
        console.error('An error occurred', error);
        this._storageService.clear();
      },
    });
  }
}
