import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UrlsService } from '@src/core/services/api';
import { ToastService } from '@src/core/services/local';
import {
  CreateUrlDialogComponent,
  RemoveUrlDialogComponent,
  UrlStatsDialogComponent,
} from '@src/modules/home/components';
import { ToastType } from '@src/types/enums';
import { UserUrl } from '@src/types/models';
import { copyToClipboard, redirectUrlRoot } from '@src/utils/urls.utils';

@Component({
  selector: 'app-my-urls',
  templateUrl: './my-urls.component.html',
  styleUrls: ['./my-urls.component.scss'],
})
export class MyUrlsComponent implements OnInit {
  rootUrl = redirectUrlRoot();
  userUrls: UserUrl[] = [];

  constructor(
    private _ngbModal: NgbModal,
    private _urlsService: UrlsService,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  onAdd(): void {
    const ref = this._ngbModal.open(CreateUrlDialogComponent);
    ref.result.then((result: UserUrl | null) => {
      if (!result) {
        return;
      }
      // If result is not empty, a new URL have been added in dialog
      // We must fetch the data again in order to see it
      this.onRefresh();
    });
  }

  onCopy(userUrl: UserUrl): void {
    const callback = (err: any) => {
      let title = 'URL copied';
      let message = 'The short URL has been copied to your clipboard';
      let type = ToastType.info;
      if (err) {
        title = 'Failure on copying URL';
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
    copyToClipboard(userUrl.shortUrl, callback);
  }

  onDisplayStats(userUrl: UserUrl): void {
    const ref = this._ngbModal.open(UrlStatsDialogComponent, {
      fullscreen: true,
    });
    ref.componentInstance.userUrl = userUrl;
  }

  onDelete(userUrl: UserUrl): void {
    const ref = this._ngbModal.open(RemoveUrlDialogComponent);
    ref.componentInstance.userUrl = userUrl;
    ref.result.then((result: boolean) => {
      if (!result) {
        return;
      }
      // Request updated URLs list from API
      this.onRefresh();
    });
  }

  onRefresh(): void {
    this._urlsService.readAll().subscribe(
      (response: UserUrl[]) =>
        (this.userUrls = response.map((u: UserUrl) => ({
          ...u,
          shortUrl: [this.rootUrl, u.shortUrl].join('/'),
        })))
    );
  }
}
