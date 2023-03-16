import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@src/constants/index';
import {
  SignInRequest,
  SignUpRequest,
  UserAccount,
  UserToken,
} from '@src/types/index';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  /**
   * Get current logged user
   */
  who(): Observable<UserAccount> {
    return this._http.get<UserAccount>(
      this._rootPath([API_ENDPOINTS.auth.who])
    );
  }

  /**
   * Attempt authentication against given user/password
   *
   * @param body user/password inputs
   */
  signIn(body: SignInRequest): Observable<UserToken> {
    return this._http.post<UserToken>(
      this._rootPath([API_ENDPOINTS.auth.signIn]),
      body
    );
  }

  /**
   * Attempt registration by providing user-relative data
   *
   * @param body user inputs
   */
  signUp(body: SignUpRequest): Observable<UserToken> {
    return this._http.post<UserToken>(
      this._rootPath([API_ENDPOINTS.auth.signUp]),
      body
    );
  }

  private _rootPath(paths: string[]): string {
    return [environment.api, API_ENDPOINTS.auth.root, ...paths].join('/');
  }
}
