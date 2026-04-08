import { inject, Inject, Injectable, OnInit } from "@angular/core";
import { TourApiService } from "./api/tour-api.service";
import { ITourTypes } from "../models/tours";
import { Subject, } from "rxjs";

@Injectable({
     providedIn: 'root'
})
export class ToursService {
  private toursApi = inject(TourApiService);
  //тип тура
  private tourTypeSubject = new Subject<ITourTypes>();
  readonly tourType$ =this.tourTypeSubject.asObservable();
  //дата тура
  private tourDateSubject = new Subject<Date | null>();
  readonly tourDate$ = this.tourDateSubject.asObservable();
  

  constructor() {}

  getTours() {
    return this.toursApi.getTours();
  }

  setTourType(type: ITourTypes): void{
    this.tourTypeSubject.next(type);
  }

  setTourDate(date: Date | null): void {
    this.tourDateSubject.next(date);
  }
}
