import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CopyClipboardBtnComponent } from './copy-clipboard-btn.component';

describe('CopyClipboardBtnComponent', () => {
  let component: CopyClipboardBtnComponent;
  let fixture: ComponentFixture<CopyClipboardBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyClipboardBtnComponent],
      imports: [NgbModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CopyClipboardBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not generate error', () => {
    expect(() => component.onCopy()).not.toThrowError();
  });
});
