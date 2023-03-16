import { Injectable } from '@angular/core';
import { UserAccount } from '@src/types/index';
import { BehaviorSubject } from 'rxjs';

const CURRENT_USER_KEY = 'currentUser';
const ACCESS_TOKEN_KEY = 'accessToken';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  /**
   * This subject's purpose is to notify all listening components that a
   * new version of the logged user is available
   */
  readonly userChanged$: BehaviorSubject<UserAccount | null> =
    new BehaviorSubject<UserAccount | null>(null);

  private _user: UserAccount | null;
  private _accessToken: string | null;

  constructor() {
    const userData = localStorage.getItem(CURRENT_USER_KEY);
    this._user = userData ? JSON.parse(userData) : null;
    this._accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  get user(): UserAccount | null {
    return this._user;
  }
  set user(user: UserAccount | null) {
    this._user = user;
    this._saveValue(CURRENT_USER_KEY, JSON.stringify(user));
    this.userChanged$.next(user);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get accessToken(): string | null {
    return this._accessToken;
  }
  set accessToken(accessToken: string | null) {
    this._accessToken = accessToken;
    this._saveValue(ACCESS_TOKEN_KEY, accessToken);
  }

  /**
   * Remove user and token from storage
   */
  clear(): void {
    this.accessToken = null;
    this.user = null;
  }

  private _saveValue(key: string, value: any): void {
    if (!value) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, value);
  }
}
