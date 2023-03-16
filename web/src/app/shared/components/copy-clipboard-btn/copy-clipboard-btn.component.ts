import { Component, Input } from '@angular/core';
import { ToastService } from '@src/core/services/local';
import { ToastType } from '@src/types/enums';
import { UserUrl } from '@src/types/models';
import { copyToClipboard } from '@src/utils/urls.utils';

@Component({
  selector: 'app-copy-clipboard-btn',
  templateUrl: './copy-clipboard-btn.component.html',
  styleUrls: ['./copy-clipboard-btn.component.scss'],
})
export class CopyClipboardBtnComponent {
  @Input() value!: string;
  @Input() title!: string;
  @Input() message!: string;
  @Input() action = 'Copy to clipboard';
  @Input() className?: string;

  constructor(private _toastService: ToastService) {}

  onCopy(): void {
    const callback = (err: any) => {
      let title = this.title;
      let message = this.message;
      let type = ToastType.info;
      if (err) {
        title = 'Failure on copying';
        message = err.message;
        type = ToastType.error;
      }
      // Informing user that the value has been place to its clipboard
      this._toastService.add({
        title,
        message,
        type,
      });
    };
    copyToClipboard(this.value, callback);
  }
}
