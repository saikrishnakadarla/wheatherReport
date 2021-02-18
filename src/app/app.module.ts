import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { WeatherReportService } from './services/weather-report.service';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [AppComponent, DashboardComponent, ReportDetailsComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [WeatherReportService],
  bootstrap: [AppComponent],
})
export class AppModule {}
