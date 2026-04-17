import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { Coords, ICountriesResponseItem, ICountryWeather, IToursData } from "../../models/tours";
import { LoaderService } from "../loader.service";
import { delay, finalize, Observable, of, catchError, map, switchMap  } from "rxjs";
import { MapService } from "../map.service"; 


@Injectable({
  providedIn: 'root'
})
export class TourApiService {

  private api = inject(API);
  private http = inject(HttpClient);
  private loaderService = inject(LoaderService);
  private mapService = inject(MapService);

  constructor() {}

  getTours(showloader = false): Observable<IToursData> {
    if (showloader) {
    this.loaderService.setLoader(true); 
  }

    return this.http.get<IToursData>(`${this.api.tours}`).pipe(
      delay(2000),
      finalize(() => {
       if (showloader) {
         this.loaderService.setLoader(false);
       }
      })
    );
  }

  getCountries(showloader = false): Observable<ICountriesResponseItem[]> {
    if (showloader) {
    this.loaderService.setLoader(true); 
    }

    return this.http.get<ICountriesResponseItem[]>(this.api.countries).pipe(
      catchError(() => of([])),
      delay(2000),
      finalize(() => {
      if (showloader) {
         this.loaderService.setLoader(false);
       } 
      })
    );
  }

 getCountryByCode(code: string): Observable<ICountryWeather> {

  return this.http.get<Coords[]>(this.api.countryByCode, {params: {codes: code}}).pipe(

    map((countrieDataArr) => countrieDataArr[0]),

    switchMap((countrieData) => {

      console.log('countrieData', countrieData);

      const coords = { lat: countrieData.latlng[0], lng: countrieData.latlng[1] };

      return this.mapService.getWeather(coords).pipe(

        map((weatherResponce) => {

          const current = weatherResponce.current;
          const hourly = weatherResponce.hourly;

          const weatherDate = {
            isDay: current.is_day,
            rain: current.rain,
            snowfall: current.snowfall,
            currentWeather: hourly.temperature_2m [15]
          };

          return { countrieData, weatherDate };
        })
      );
    })
  );
}
}