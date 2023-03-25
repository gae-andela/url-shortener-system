import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UrlsService } from '@src/core/services/api';
import { ToastService } from '@src/core/services/local';
import { WithForm } from '@src/shared/mixins';
import { ToastType } from '@src/types/index';
import { UserUrl } from '@src/types/models';
import { copyToClipboard, redirectUrlRoot } from '@src/utils/urls.utils';

@Component({
  selector: 'app-create-url-dialog',
  templateUrl: './create-url-dialog.component.html',
  styleUrls: ['./create-url-dialog.component.scss'],
})
export class CreateUrlDialogComponent extends WithForm() {
  rootUrl = redirectUrlRoot();
  // This .cust is useful in Backend in order to distinguish custom URLs and generated ones
  rootCustomUrl = `${this.rootUrl}.cust`;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private _urlService: UrlsService,
    private _toastService: ToastService
  ) {
    super();
    this.formGroup = this._createForm();
  }

  onClose(userUrl: UserUrl | null = null): void {
    this.activeModal.close(userUrl);
  }

  onSubmit(): void {
    const { longUrl, shortUrl, expiryDate } = this.formGroup.value;
    this._urlService
      .create({
        longUrl,
        shortUrl: shortUrl?.trim().length ? shortUrl.trim() : null,
        expiryDate,
      })
      .subscribe((userUrl: UserUrl) => {
        const callback = (err: any) => {
          if (err) {
            return;
          }
          this._toastService.add({
            title: 'URL copied',
            message: `The newly generated short URL ${this.rootUrl}${userUrl.shortUrl} has been copied to your clipboard`,
            type: ToastType.info,
          });
        };
        const fullUrl = [redirectUrlRoot(), userUrl.shortUrl].join('/');
        copyToClipboard(fullUrl, callback);
        this.onClose(userUrl);
      });
  }

  private _createForm(): FormGroup {
    // URL regex for validating user input
    const urlRegex = new RegExp(
      '^(http[s]?://(www.)?|ftp://(www.)?|www.){1}(.+)*?$'
    );

    return this._formBuilder.group({
      longUrl: [null, [Validators.required, Validators.pattern(urlRegex)]],
      shortUrl: [null, []],
      //TODO: Deal with custom expiryDate
    });
  }
}
