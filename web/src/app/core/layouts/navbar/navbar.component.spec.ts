import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WINDOW_TOKEN } from '@src/constants/index';
import { StorageService } from '@src/core/services/local';

import { NavbarComponent } from './navbar.component';

const windowMock = {
  location: {
    reload: () => {},
  },
};
const DEFAULT_STORAGE_VALUE = {
  accessToken: 'anything',
  user: {},
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: WINDOW_TOKEN,
          useValue: windowMock,
        },
      ],
      declarations: [NavbarComponent],
    }).compileComponents();

    storageService = TestBed.inject(StorageService);
    Object.assign(storageService, DEFAULT_STORAGE_VALUE);

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clean storage on logout', () => {
    expect(storageService.accessToken).toEqual(
      DEFAULT_STORAGE_VALUE.accessToken
    );
    component.onLogout();
    expect(storageService.accessToken).toBeNull();
  });
});
