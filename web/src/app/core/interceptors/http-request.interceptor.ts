import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';
import { ToastService, StorageService } from '@src/core/services/local';
import { ToastType } from '@src/types/enums';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private _toastService: ToastService,
    private _storageService: StorageService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // The purpose of this interceptor is to add access Token to every requests
    // When the a token is available in browser storage
    const accessToken = this._storageService.accessToken;
    let finalRequest = request;
    if (!!accessToken) {
      finalRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }
    return next.handle(finalRequest).pipe(
      catchError(({ error }: any) => {
        const { message, errors = [error.message] } = error;
        const errorMessage = Array.isArray(errors) ? errors.join('. ') : errors;
        // Notify user about the encountered error
        this._toastService.add({
          title: message,
          message: errorMessage,
          type: ToastType.error,
        });
        return throwError(() => error);
      })
    );
  }
}
