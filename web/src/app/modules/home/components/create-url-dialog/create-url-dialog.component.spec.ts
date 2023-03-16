import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CreateUrlDialogComponent } from './create-url-dialog.component';

describe('CreateUrlDialogComponent', () => {
  let component: CreateUrlDialogComponent;
  let fixture: ComponentFixture<CreateUrlDialogComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [CreateUrlDialogComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CreateUrlDialogComponent);
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
    expect(component.activeModal.close).toHaveBeenCalledWith(null);
  });

  it('should close with value on submit', () => {
    spyOn(component.activeModal, 'close');
    component.onSubmit();
    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/urls'
    );
    req.flush({ id: 1 });
    expect(req.request.method).toEqual('POST');
    expect(component.activeModal.close).toHaveBeenCalledWith({ id: 1 });
  });
});
