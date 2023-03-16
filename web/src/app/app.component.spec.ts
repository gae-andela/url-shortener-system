import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ROUTE_PATHS } from '@src/constants/route.constant';
import { StorageService } from '@src/core/services/local';
import { AppComponent } from './app.component';

const MOCK_USER = {
  id: 1,
  firstName: 'test',
  lastName: 'TEST',
  email: 'test@mail.com',
  createDate: '2023-01-01 01:01:01',
};

const MockStorageService = jasmine.createSpyObj('StorageService', {
  accessToken: null,
  clear: () => {},
});

@Component({
  selector: 'app-child',
  template: ` <div id="fake">Unit Test Child</div> `,
})
class FakeChildComponent {}

const routes: Routes = [
  {
    path: ROUTE_PATHS.auth,
    component: FakeChildComponent,
    data: {
      title: 'Fake',
      description: 'Child Component',
    },
  },
];

describe('AppComponent', () => {
  let httpTestingController: HttpTestingController;
  let storageService: StorageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      providers: [{ provide: StorageService, useValue: MockStorageService }],
      declarations: [
        FakeFooterComponent,
        FakeNavbarComponent,
        FakeToastContainerComponent,
        AppComponent,
      ],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    storageService.accessToken = null;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'URL Shortener System'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('URL Shortener System');
  });

  it('should not request current user if not token in storage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    httpTestingController.expectNone('http://localhost:8080/api/auth/who');
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should request current user if token in storage', () => {
    storageService.accessToken = 'A given token';
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/auth/who'
    );
    req.flush(MOCK_USER);
    expect(storageService.user).toEqual(MOCK_USER);
  });

  it('should clean storage on request error', () => {
    storageService.accessToken = 'A given token';
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/auth/who'
    );
    req.flush('Error occurred', { status: 404, statusText: 'Not Found' });
    expect(MockStorageService.clear.calls.count()).toEqual(1);
  });

  it('should change title upon navigation', () => {
    storageService.accessToken = null;
    const fixture = TestBed.createComponent(AppComponent);
    router.navigate([ROUTE_PATHS.auth]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toContain('Unit Test NavBar');
  });
});

@Component({
  selector: 'app-footer',
  template: ` <div>Unit Test Footer</div> `,
})
class FakeFooterComponent {}
@Component({
  selector: 'app-navbar',
  template: ` <div>Unit Test NavBar</div> `,
})
class FakeNavbarComponent {}
@Component({
  selector: 'app-toast-container',
  template: ` <div>Unit Test Toast Container</div> `,
})
class FakeToastContainerComponent {}
