import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have empty properties if empty storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const storageService = new StorageService();
    expect(storageService.user).toBeNull();
    expect(storageService.accessToken).toBeNull();
  });

  it('should not have empty properties if non-empty storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('{}');
    const storageService = new StorageService();
    expect(storageService.user).not.toBeNull();
    expect(storageService.accessToken).not.toBeNull();

    storageService.clear();
    expect(storageService.user).toBeNull();
    expect(storageService.accessToken).toBeNull();
  });
});
