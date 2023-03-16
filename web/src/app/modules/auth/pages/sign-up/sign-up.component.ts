import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ROUTE_PATHS, WINDOW_TOKEN } from '@src/constants/index';
import { WithForm } from '@src/shared/mixins';
import { AuthService } from '@src/core/services/api';
import { StorageService } from '@src/core/services/local';
import { UserToken } from '@src/types/models';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends WithForm() {
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
    const { firstName, lastName, email, password } = this.formGroup.value;
    this._authService
      .signUp({ firstName, lastName, email, password })
      .subscribe(({ accessToken }: UserToken) => {
        // Storing token in browser storage and reloading
        this._storageService.accessToken = accessToken;
        this._window.location.reload();
      });
  }

  private _createForm(): FormGroup {
    return this._formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
}
