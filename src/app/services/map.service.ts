import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ILocation } from "../models/tours";
import { Observable } from "rxjs";
import { IWeatherResponse } from "../models/map";
import { API } from "../shared/api";


@Injectable ({
    providedIn: 'root'
})
export class MapService {
  private api = inject(API);


    constructor (private http: HttpClient) {}

    
    
    getWeather(coord: ILocation): Observable<IWeatherResponse> {
        const params = {
        "latitude": coord.lat,
        "longitude": coord.lng,
        "hourly": "temperature_2m",
        "current": ["is_day", "snowfall", "rain"],
        "forecast_days": 1,
        };

        return this.http.get<IWeatherResponse>(this.api.getWeather, { params });
    }

}
