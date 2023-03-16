import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ROUTE_PATHS } from '@src/constants/route.constant';
import { StorageService } from '@src/core/services/local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivateChild {
  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // We've configured our routes with a data containing a boolean named expectedUser
    // If expectedUser is true, this route must be accessed by authenticated user
    const { expectUser } = route.data;
    const authenticated = !!this._storageService.accessToken;
    if (expectUser && !authenticated) {
      // User is not yet authenticated, we redirect him to login page
      this._router.navigate([ROUTE_PATHS.root, ROUTE_PATHS.auth]);
      return false;
    }
    if (!expectUser && authenticated) {
      // User is already authenticated, we redirect him to home page
      this._router.navigate([ROUTE_PATHS.root, ROUTE_PATHS.home]);
      return false;
    }
    return true;
  }
}
