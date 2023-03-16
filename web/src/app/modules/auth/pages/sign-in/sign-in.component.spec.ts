import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WINDOW_TOKEN } from '@src/constants/index';
import { StorageService } from '@src/core/services/local';

import { SignInComponent } from './sign-in.component';

const windowMock = {
  location: {
    reload: () => {},
  },
};

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let httpTestingController: HttpTestingController;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: WINDOW_TOKEN,
          useValue: windowMock,
        },
      ],
      declarations: [SignInComponent],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call request on submit', () => {
    component.onSubmit();
    const data: any = { accessToken: 'ABC' };
    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/auth/sign-in'
    );
    req.flush(data);
    fixture.detectChanges();

    expect(storageService.accessToken).toEqual('ABC');
  });
});
