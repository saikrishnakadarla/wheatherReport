import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CityDetails } from '../services/weather-report.model';
import { WeatherReportService } from '../services/weather-report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public cities$: Observable<CityDetails[]>;

  public displayedColumns: string[] = [
    'No',
    'CityName',
    'Temp',
    'Sunrise',
    'Sunset',
  ];
  public dataSource: any = [];

  constructor(
    private weatherReportService: WeatherReportService,
    private router: Router
  ) {
    this.cities$ = this.weatherReportService.getCities();
  }

  // ngOnInit(): void {}

  public getDetails(item: CityDetails): void {
    this.router.navigate(['report-details', item.name]);
  }
}
