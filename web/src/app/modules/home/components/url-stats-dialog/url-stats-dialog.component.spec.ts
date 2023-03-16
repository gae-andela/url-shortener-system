import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';

import { UrlStatsDialogComponent } from './url-stats-dialog.component';

describe('UrlStatsDialogComponent', () => {
  let component: UrlStatsDialogComponent;
  let fixture: ComponentFixture<UrlStatsDialogComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [NgbActiveModal],
      imports: [HttpClientTestingModule, NgChartsModule],
      declarations: [UrlStatsDialogComponent],
    }).compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(UrlStatsDialogComponent);
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
    expect(component.activeModal.close).toHaveBeenCalledWith();
  });

  it('should fetch stats upon userUrl change', () => {
    spyOn(component.activeModal, 'close');
    component.userUrl = { id: 1, longUrl: 'http://fake.url' } as any;
    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/urls/1/stats'
    );
    const ip = '0.0.0.0';
    const referrer = 'https://angular.com';
    req.flush([
      { id: 1, ip, referrer },
      { id: 2, ip, referrer },
      { id: 3, ip, referrer: 'http://another-referrer.com' },
    ]);
    expect(req.request.method).toEqual('GET');

    expect(component.chartData[0].data.length).toEqual(2);
  });
});
