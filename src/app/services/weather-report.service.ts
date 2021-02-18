import { HttpClient } from '@angular/common/http';
import { concat, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, switchMap, toArray } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { City, CityDetails } from './weather-report.model';

@Injectable()
export class WeatherReportService {
  private readonly apiKey = '3d8b309701a13f65b660fa2c64cdc517';
  constructor(private http: HttpClient) {}

  public getCities(): Observable<CityDetails[]> {
    return this.http
      .get(`${environment.apiUrl}/find?lat=51.5085&lon=-0.1257&cnt=5&appid=${this.apiKey}`) // api to get 5 UK cities
      .pipe(
        map((cities: any) => cities.list),
        map((contries: City[]) => {
          return contries.map((country: any) => country.name);
        }),
        switchMap((countryNames) => {
          return concat(
            ...countryNames.map((countryName: any) => {
              return this.getList(countryName); // get country details to display sunrise and sunset detials
            })
          ).pipe(toArray());
        }),
        map((cityDetails: CityDetails[]) => {
          return cityDetails.map((d: any) => { // mapping required details
            return {
              name: d.name,
              temp: d.main.temp,
              sunrise: d.sys.sunrise,
              sunset: d.sys.sunset,
            };
          });
        })
      );
  }

  public getList(q: string): Observable<CityDetails> {
    return this.http
      .get(`${environment.apiUrl}/weather?q=${q}&appid=${this.apiKey}`)
      .pipe(
        map((result: any) => result)
      );
  }

  public getNextDaysReports(name: string, cnt = 40): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/forecast?q=${name}&appid=${this.apiKey}&cnt=${cnt}`
      )
      .pipe(
        map((nextFiveDaysList: any) => ({
          city: nextFiveDaysList.city,
          list: nextFiveDaysList.list
            .map((cityDetails: any) => {
              if (cityDetails.dt_txt.indexOf('9:00:00') === -1) {
                return;
              }
              return {
                dt: cityDetails.dt,
                dt_txt: cityDetails.dt_txt,
                temp: cityDetails.main.temp,
                sea_level: cityDetails.main.sea_level,
              };
            })
            .filter((d: any) => !!d),
        }))
      );
  }
}
