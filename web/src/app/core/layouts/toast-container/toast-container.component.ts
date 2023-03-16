import { Component } from '@angular/core';
import { ToastService } from '@src/core/services/local';
import { WithHooks } from '@src/shared/mixins';
import { Toast } from '@src/types/others';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent extends WithHooks() {
  toasts: Toast[] = [];

  constructor(private _toastService: ToastService) {
    super();
    this._subscribeToToastsChanges();
  }

  onRemove(toast: Toast): void {
    this._toastService.remove(toast);
  }

  trackById(_: number, toast: Toast): number {
    // That way we can increase performances by avoiding rendering
    //of all toasts when a single one changed
    return toast.id;
  }

  private _subscribeToToastsChanges(): void {
    this._toastService.toastsChanged$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((toasts: Toast[]) => (this.toasts = toasts));
  }
}
