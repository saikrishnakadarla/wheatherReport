import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WeatherReportService } from './weather-report.service';
import { resultOne, resultThree, resultTwo } from './weather-report-mock.data';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';



const cityName = {
    name: 'London',
    temp: 17,
    sunrise: 1234,
    sunset: 4321
};

const cityDetails = [{
  dt: 'London',
  dt_txt: 17,
  temp: 1234,
  sea_level: 4321
}];

describe('WeatherReportService', () => {
  let service: WeatherReportService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherReportService],
    });
    service = TestBed.inject(WeatherReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getList', () => {
    it('should return weather list', (done) => {
      const success$ = service.getList('London');

      success$.subscribe((res) => {
        expect(res.name).toEqual('London');
        done();
      });

      const req = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5//weather?q=London&appid=3d8b309701a13f65b660fa2c64cdc517`
      );
      expect(req.request.method).toBe('GET');
      req.flush(resultOne);
    });
  });

  describe('getCities', () => {
    it('should return weather list', () => {
      const cities$ = service.getCities();

      cities$.subscribe();

      const req = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5//find?lat=51.5085&lon=-0.1257&cnt=5&appid=3d8b309701a13f65b660fa2c64cdc517`
      );
      expect(req.request.method).toBe('GET');
      req.flush(resultTwo);

    });
  });

  describe('getNextDaysReports', () => {
    it('should return next 5 days', (done) => {
      const suc$ = service.getNextDaysReports('London');

      suc$.subscribe((res) => {
        console.log('res........', res);
        expect(Object.keys(res)).toEqual(['city', 'list']);
        done();
      });

      const reqq = httpMock.expectOne(
        `http://api.openweathermap.org/data/2.5//forecast?q=London&appid=3d8b309701a13f65b660fa2c64cdc517&cnt=40`
      );
      expect(reqq.request.method).toBe('GET');
     // expect(reqq.request.body.map((d: any) => ({ name: d}))).toEqual(cityDetails.map(id => ({ name: id })));
      reqq.flush(resultThree);
    });
    });
});
