import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTE_PATHS } from '@src/constants/index';
import { StorageService } from '@src/core/services/local';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let storageService: StorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterTestingModule] });
    guard = TestBed.inject(AuthenticatedGuard);
    router = TestBed.inject(Router);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should reject when accessing user route without token', () => {
    spyOn(router, 'navigate').and.returnValue(
      new Promise((resolve) => resolve(true))
    );
    storageService.accessToken = null;
    const dummyRoute: any = {
      data: { expectUser: true },
    };
    const dummyState = {} as RouterStateSnapshot;

    const result = guard.canActivateChild(dummyRoute, dummyState);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith([
      ROUTE_PATHS.root,
      ROUTE_PATHS.auth,
    ]);
  });

  it('should reject when accessing non user route with token', () => {
    spyOn(router, 'navigate').and.returnValue(
      new Promise((resolve) => resolve(true))
    );
    storageService.accessToken = 'ABCD';
    const dummyRoute: any = {
      data: { expectUser: false },
    };
    const dummyState = {} as RouterStateSnapshot;

    const result = guard.canActivateChild(dummyRoute, dummyState);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith([
      ROUTE_PATHS.root,
      ROUTE_PATHS.home,
    ]);
  });

  it('should not block when accessing user route with token', () => {
    spyOn(router, 'navigate').and.returnValue(
      new Promise((resolve) => resolve(true))
    );
    storageService.accessToken = 'ABCD';
    const dummyRoute: any = {
      data: { expectUser: true },
    };
    const dummyState = {} as RouterStateSnapshot;

    const result = guard.canActivateChild(dummyRoute, dummyState);
    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
