import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { RemoveUrlDialogComponent } from './remove-url-dialog.component';

describe('RemoveUrlDialogComponent', () => {
  let component: RemoveUrlDialogComponent;
  let fixture: ComponentFixture<RemoveUrlDialogComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      imports: [HttpClientTestingModule],
      declarations: [RemoveUrlDialogComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RemoveUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close without value on dismiss', () => {
    spyOn(component.activeModal, 'close');
    component.onClose();
    fixture.detectChanges();
    expect(component.activeModal.close).toHaveBeenCalledWith(false);
  });

  it('should call API upon deletion', () => {
    component.userUrl = { id: 1 } as any;
    component.onDelete();
    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/urls/1'
    );
    req.flush({});
    expect(req.request.method).toEqual('DELETE');
  });
});
