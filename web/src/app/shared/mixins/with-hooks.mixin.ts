import { GConstructor, HookAware } from '@src/types/others';
import { Subject } from 'rxjs';

/**
 * Mixin class for automatically unsubscribing in component classes and avoid memory leaks.
 */
export const WithHooks = <T extends GConstructor>(base: any = class {} as T) =>
  class extends base implements HookAware {
    destroyed$: Subject<void> = new Subject<void>();
    constructor(...args: any[]) {
      super(...args);
    }

    ngOnInit(): void {
      // Nothing here, used for allowing the super call
    }

    ngAfterViewInit(): void {
      // Nothing here, used for allowing the super call
    }

    /**
     * DO NOT this.destroyed$.complete();
     * It is not necessary:
     * https://stackoverflow.com/questions/44289859/do-i-need-to-complete-a-subject-for-it-to-be-garbage-collected
     */
    ngOnDestroy(): void {
      this.destroyed$.next();
    }
  };
