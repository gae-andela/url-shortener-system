import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GConstructor, HookAware, TitleAware } from '@src/types/index';
import { findArgOfType } from '@src/utils/index';
import { Subject, filter, map } from 'rxjs';

/**
 * Mixin class to automatically subscribe to title changes.
 */
export const WithTitle = <T extends GConstructor<HookAware>>(
  base: T = class {} as T
) =>
  class extends base implements TitleAware {
    title$: Subject<string> = new Subject();
    title: string;
    description: string | null = null;

    private readonly _defaultTitle = 'URL Shortener System';
    private _WithTitle: Title;
    private _WithTitleRouter: Router;
    private _WithTitleActivatedRoute: ActivatedRoute;

    constructor(...args: any[]) {
      super(...args);
      this._WithTitle = findArgOfType(args, Title);
      this._WithTitleRouter = findArgOfType(args, Router);
      this._WithTitleActivatedRoute = findArgOfType(args, ActivatedRoute);
      this.title = this._defaultTitle;
    }

    override ngOnInit(): void {
      super.ngOnInit();
      this._subscribeToNavigationEnd();
    }

    private _subscribeToNavigationEnd(): void {
      this._WithTitleRouter.events
        .pipe(
          filter((event: any) => event instanceof NavigationEnd),
          map(() => {
            const child = this._WithTitleActivatedRoute.firstChild;
            if (!child) {
              return { title: this._defaultTitle, description: null };
            }
            const lastChild = this._getRouteChild(child);
            const data: any = lastChild.snapshot.data || {};
            const title = data.title || this._defaultTitle;
            const description = data.description || null;
            return {
              title: [this._defaultTitle, title].join(' | '),
              description,
            };
          })
        )
        .subscribe((data: { title: string; description: string | null }) => {
          this.title = data.title;
          this.description = data.description;
          this._WithTitle.setTitle(this.title);
        });
    }

    private _getRouteChild(activatedRoute: ActivatedRoute): ActivatedRoute {
      return activatedRoute.firstChild
        ? this._getRouteChild(activatedRoute.firstChild)
        : activatedRoute;
    }
  };
