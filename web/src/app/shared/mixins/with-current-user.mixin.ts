import {
  CurrentUserAware,
  GConstructor,
  HookAware,
  UserAccount,
} from '@src/types/index';
import { findArgOfType } from '@src/utils/index';
import { StorageService } from '@src/core/services/local';
import { takeUntil } from 'rxjs';

/**
 * Mixin class to automatically subscribe to user change events.
 */
export const WithCurrentUser = <T extends GConstructor<HookAware>>(
  base: T = class {} as T
) =>
  class extends base implements CurrentUserAware {
    private _withCurrentUserStorageService: StorageService;

    constructor(...args: any[]) {
      super(...args);
      this._withCurrentUserStorageService = findArgOfType(args, StorageService);
    }

    get userName(): string {
      return this.user ? `${this.user.firstName} ${this.user.lastName}` : 'N/A';
    }

    get user(): UserAccount | null {
      return this._withCurrentUserStorageService.user;
    }

    override ngOnInit(): void {
      super.ngOnInit();
      this._subscribeToUserChanges();
    }

    /**
     * Override this method in child components in order to decide what to do upon user change
     */
    protected _afterUserChanges(): void {
      // Nothing
    }

    private _subscribeToUserChanges(): void {
      this._withCurrentUserStorageService.userChanged$
        .pipe(takeUntil(this.destroyed$))
        .subscribe(() => {
          this._afterUserChanges();
        });
    }
  };
