import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API } from "../../shared/api";
import { IToursData } from "../../models/tours";
import { LoaderService } from "../loader.service";
import { delay, finalize } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TourApiService {

  private api = API;
  private http = inject(HttpClient);
  private loaderService = inject(LoaderService);

  constructor() {}

  getTours() {
    this.loaderService.setLoader(true);

    return this.http.get<IToursData>(`${this.api.tours}`).pipe(
      delay(2000),
      finalize(() => {
        this.loaderService.setLoader(false);
      })
    );
  }
}