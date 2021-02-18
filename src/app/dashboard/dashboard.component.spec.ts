import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { WeatherReportService } from '../services/weather-report.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const cityName = {
    name: 'London',
    temp: 17,
    sunrise: 1234,
    sunset: 4321
};
  const weatherReportServiceMock = {
    getCities: jasmine.createSpy('getCities').and.returnValue({
      pipe: jasmine.createSpy('pipe').and.returnValue(of(cityName)),
    }),
    routerMock: jasmine.createSpyObj('router', ['navigate'])
  };
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule, MatCardModule, MatToolbarModule, MatIconModule],
      declarations: [DashboardComponent],
      providers: [
        {
          provide: WeatherReportService,
          useValue: weatherReportServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details', () => {
    component.getDetails(cityName);
    expect(routerMock.navigate).toHaveBeenCalledWith(['report-details', cityName.name]);
  });
});
