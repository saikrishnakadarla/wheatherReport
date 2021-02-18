import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WeatherReportService } from '../services/weather-report.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss'],
})
export class ReportDetailsComponent implements OnInit {
  private city: string;

  public cityDetails$: Observable<any>;
  constructor(
    private activeRoute: ActivatedRoute,
    private weatherReportService: WeatherReportService
  ) {
    this.city = this.activeRoute.snapshot.params.city;
    this.cityDetails$ = this.weatherReportService
      .getNextDaysReports(this.city);
  }

  ngOnInit(): void {}
}
