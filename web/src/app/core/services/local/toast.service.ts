import { Injectable } from '@angular/core';
import { Toast, ToastAriaLive } from '@src/types/index';
import { BehaviorSubject } from 'rxjs';

type RequiredParam = Omit<Toast, 'id' | 'delay' | 'ariaLive' | 'autoHide'>;
type NonRequiredParam = Omit<Toast, 'title' | 'message' | 'type' | 'id'>;
type ToastParam = RequiredParam & {
  [P in keyof NonRequiredParam]?: NonRequiredParam[P];
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * This subject's purpose is to notify all listening components of a
   * changes on current toasts (notifications)
   */
  toastsChanged$ = new BehaviorSubject<Toast[]>([]);
  private _toasts: Record<number, Toast> = {};

  /**
   * Display a new message to user's screen
   *
   * @param params
   */
  add(params: ToastParam): void {
    const id = Math.floor(Math.random() * 6 + 1);
    this._toasts = {
      ...this._toasts,
      [id]: {
        id,
        ...params,
        delay: params.delay || 5000,
        ariaLive: params.ariaLive || ToastAriaLive.alert,
        autoHide: params.autoHide || true,
      },
    };
    this.toastsChanged$.next(Object.values(this._toasts));
  }

  /**
   * Remove given toast from screen
   *
   * @param toast
   */
  remove(toast: Toast) {
    const { [toast.id]: _, ...newValue } = this._toasts;
    this._toasts = newValue;
    this.toastsChanged$.next(Object.values(this._toasts));
  }
}
