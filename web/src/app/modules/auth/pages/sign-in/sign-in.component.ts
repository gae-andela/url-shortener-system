import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTE_PATHS, WINDOW_TOKEN } from '@src/constants/index';
import { WithForm } from '@src/shared/mixins';
import { AuthService } from '@src/core/services/api';
import { StorageService } from '@src/core/services/local';
import { UserToken } from '@src/types/models';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent extends WithForm() {
  routePaths = ROUTE_PATHS;
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _storageService: StorageService,
    @Inject(WINDOW_TOKEN) private _window: Window
  ) {
    super();
    this.formGroup = this._createForm();
  }

  onSubmit(): void {
    const { email, password } = this.formGroup.value;
    this._authService
      .signIn({ email, password })
      .subscribe(({ accessToken }: UserToken) => {
        // Storing token in browser storage and reloading
        this._storageService.accessToken = accessToken;
        this._window.location.reload();
      });
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
}
