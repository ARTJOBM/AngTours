import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { IToursData } from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TourApiService {
  private api = API;
  private http = inject(HttpClient);

  constructor() {}

  getTours() {
    return this.http.get<IToursData>(this.api.tours);
  }
}