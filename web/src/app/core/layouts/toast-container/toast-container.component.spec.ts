import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '@src/core/services/local';
import { ToastType } from '@src/types/enums';

import { ToastContainerComponent } from './toast-container.component';

describe('ToastContainerComponent', () => {
  let component: ToastContainerComponent;
  let fixture: ComponentFixture<ToastContainerComponent>;
  let toastService: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbToastModule],
      declarations: [ToastContainerComponent],
    }).compileComponents();

    toastService = TestBed.inject(ToastService);

    fixture = TestBed.createComponent(ToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add and remote/toasts to content', () => {
    toastService.add({ title: 'Test', message: 'Test', type: ToastType.info });
    fixture.detectChanges();
    expect(component.toasts.length).toEqual(1);
    const toast = component.toasts[0];
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(`#toast-${toast.id}`)?.textContent).toContain(
      'Test'
    );

    component.onRemove(component.toasts[0]);
    fixture.detectChanges();
    expect(component.toasts.length).toEqual(0);
  });
});
