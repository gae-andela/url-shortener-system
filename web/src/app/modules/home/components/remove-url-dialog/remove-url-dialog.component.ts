import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UrlsService } from '@src/core/services/api';
import { ToastService } from '@src/core/services/local';
import { ToastType } from '@src/types/enums';
import { UserUrl } from '@src/types/models';

@Component({
  selector: 'app-remove-url-dialog',
  templateUrl: './remove-url-dialog.component.html',
  styleUrls: ['./remove-url-dialog.component.scss'],
})
export class RemoveUrlDialogComponent {
  userUrl!: UserUrl;
  constructor(
    public activeModal: NgbActiveModal,
    private _toastService: ToastService,
    private _urlsService: UrlsService
  ) {}

  onClose(removed: boolean = false): void {
    this.activeModal.close(removed);
  }

  onDelete(): void {
    this._urlsService.removeById(this.userUrl.id).subscribe(() => {
      this._toastService.add({
        title: 'URL removed',
        message: `The redirection for URL ${this.userUrl.longUrl} has been removed`,
        type: ToastType.info,
      });
      this.onClose(true);
    });
  }
}
