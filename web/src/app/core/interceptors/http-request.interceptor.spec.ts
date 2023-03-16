import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StorageService, ToastService } from '@src/core/services/local';
import { ToastType } from '@src/types/enums';

import { HttpRequestInterceptor } from './http-request.interceptor';

describe('HttpRequestInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let storageService: StorageService;
  let toastService: ToastService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpRequestInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpRequestInterceptor,
          multi: true,
        },
      ],
    })
  );

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
    toastService = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    const interceptor: HttpRequestInterceptor = TestBed.inject(
      HttpRequestInterceptor
    );
    expect(interceptor).toBeTruthy();
  });

  it('should add token to request', () => {
    storageService.accessToken = 'ABCDE';
    const client = TestBed.inject(HttpClient);
    client.get('/target').subscribe();
    const req = httpTestingController.expectOne('/target');
    req.flush({});
    expect(req.request.headers.get('Authorization')).toEqual(
      `Bearer ${storageService.accessToken}`
    );
  });

  it('should notify on error', () => {
    spyOn(toastService, 'add');
    const client = TestBed.inject(HttpClient);
    client.get('/target').subscribe({ error: (e) => console.log(e) });
    const error = { message: 'Any message', errors: [] };
    const req = httpTestingController.expectOne('/target');
    req.flush(error, { status: 404, statusText: 'Not Found' });

    expect(toastService.add).toHaveBeenCalledWith({
      title: error.message,
      message: '',
      type: ToastType.error,
    });
  });

  it('should set same message if not errors', () => {
    spyOn(toastService, 'add');
    const client = TestBed.inject(HttpClient);
    client.get('/target').subscribe({ error: (e) => console.log(e) });
    const error = { message: 'Any message' };
    let req = httpTestingController.expectOne('/target');
    req.flush(error, { status: 404, statusText: 'Not Found' });

    expect(toastService.add).toHaveBeenCalledWith({
      title: error.message,
      message: error.message,
      type: ToastType.error,
    });

    client.get('/target').subscribe({ error: (e) => console.log(e) });
    req = httpTestingController.expectOne('/target');
    req.flush(
      { ...error, errors: 'text errors' },
      { status: 404, statusText: 'Not Found' }
    );

    expect(toastService.add).toHaveBeenCalledWith({
      title: error.message,
      message: 'text errors',
      type: ToastType.error,
    });
  });
});
