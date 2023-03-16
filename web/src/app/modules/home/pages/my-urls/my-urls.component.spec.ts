import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MyUrlsComponent } from './my-urls.component';

const createDate = new Date().toString();
const expiryDate = new Date().toString();
const longUrl = 'http://fake.com';
const shortUrl = 'abc';
const URL = 'http://localhost:8080/api/urls';
const DATA = [
  {
    id: 1,
    longUrl,
    shortUrl,
    createDate,
    expiryDate,
  },
  {
    id: 2,
    longUrl,
    shortUrl,
    createDate,
    expiryDate,
  },
];

class ModalRef {
  result: any;
  componentInstance: any = {};

  constructor(public v: any) {
    this.result = new Promise((resolve) => resolve(v));
  }
}

describe('MyUrlsComponent', () => {
  let component: MyUrlsComponent;
  let fixture: ComponentFixture<MyUrlsComponent>;
  let httpTestingController: HttpTestingController;
  let ngbModal: NgbModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgbModule, ReactiveFormsModule],
      declarations: [MyUrlsComponent],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);

    ngbModal = TestBed.inject(NgbModal);
    fixture = TestBed.createComponent(MyUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh data when requesting', () => {
    let req = httpTestingController.expectOne(URL);
    req.flush([] as any);
    expect(component.userUrls.length).toEqual(0);

    component.onRefresh();
    req = httpTestingController.expectOne(URL);
    req.flush(DATA);
    expect(component.userUrls.length).toEqual(2);
  });

  it('should run onAdd without error', () => {
    const req = httpTestingController.expectOne(URL);
    req.flush([] as any);
    expect(component.userUrls.length).toEqual(0);

    let result: any = null;
    const callFake = () => new ModalRef(result) as any;
    spyOn(ngbModal, 'open').and.callFake(callFake);
    component.onAdd();
    fixture.detectChanges();
    expect(ngbModal.open).toHaveBeenCalled();

    result = { id: 1 };
    component.onAdd();
    fixture.detectChanges();
    expect(ngbModal.open).toHaveBeenCalled();
  });

  it('should run onDelete without error', () => {
    const req = httpTestingController.expectOne(URL);
    req.flush([] as any);

    let result = false;
    const callFake = () => new ModalRef(result) as any;
    spyOn(ngbModal, 'open').and.callFake(callFake);
    component.onDelete({} as any);
    fixture.detectChanges();
    expect(ngbModal.open).toHaveBeenCalled();

    result = true;
    component.onDelete({} as any);
    fixture.detectChanges();
    expect(ngbModal.open).toHaveBeenCalled();
  });

  it('should run onDisplayStats without error', () => {
    const req = httpTestingController.expectOne(URL);
    req.flush([] as any);

    const ref = new ModalRef(null) as any;
    const callFake = () => ref;
    spyOn(ngbModal, 'open').and.callFake(callFake);
    component.onDisplayStats({ id: 3 } as any);
    fixture.detectChanges();
    expect(ngbModal.open).toHaveBeenCalled();
    expect(ref.componentInstance.userUrl.id).toEqual(3);
  });

  it('should run onCopy without error', () => {
    const req = httpTestingController.expectOne(URL);
    req.flush([] as any);

    let promise = new Promise((resolve) => resolve({}));
    const callFake: any = () => promise;
    spyOn(navigator.clipboard, 'writeText').and.callFake(callFake);
    component.onCopy({ shortUrl: 'abc' } as any);
    fixture.detectChanges();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('abc');

    promise = new Promise((_, reject) => reject({}));
    component.onCopy({ shortUrl: 'abc' } as any);
    fixture.detectChanges();
  });
});
