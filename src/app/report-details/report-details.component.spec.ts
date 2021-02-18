import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { WeatherReportService } from '../services/weather-report.service';

import { ReportDetailsComponent } from './report-details.component';

describe('ReportDetailsComponent', () => {
  let component: ReportDetailsComponent;
  let fixture: ComponentFixture<ReportDetailsComponent>;
  const weatherReportServiceMock = {
    getCities: jasmine.createSpy('getCities'),
    getNextDaysReports: jasmine.createSpy('getNextDaysReports'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, MatCardModule, MatToolbarModule, MatIconModule],
      declarations: [ReportDetailsComponent],
      providers: [
        {
          provide: WeatherReportService,
          useValue: weatherReportServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                city: 'London',
              },
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
