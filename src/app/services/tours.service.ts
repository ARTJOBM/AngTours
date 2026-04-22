import { inject, Inject, Injectable, OnInit } from "@angular/core";
import { TourApiService } from "./api/tour-api.service";
import { ITour, ITourTypes, ICountriesResponseItem, IToursData, IToursServerRes } from "../models/tours";
import { delay, forkJoin, Observable, Subject, } from "rxjs";
import { map, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoaderService } from "../services/loader.service";



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
  
  private loaderService = inject(LoaderService);

  constructor() {}

  getTours(): Observable<ITour[]> {
    const countries$ = this.toursApi.getCountries();
    const tours$ = this.toursApi.getTours();

    this.loaderService.setLoader(true);

    return forkJoin<[ICountriesResponseItem [], IToursServerRes]>([countries$, tours$]).pipe(
      delay(1000),

      map((data) => {
        console.log('data', data);
        let toursWithCountries: ITour[] = [];

        const toursArr = data[1].tours;
        const countriesMap = new Map();

        data[0].forEach(country => {
          countriesMap.set(country.iso_code2, country);
        });

        if (Array.isArray(toursArr)) {
          toursWithCountries = toursArr.map<ITour>((tour) => {
            return {
              ...tour,
              country: countriesMap.get(tour.code) || null,
             }
          });
        }
        console.log('toursWithCountries', toursWithCountries)
        return toursWithCountries
      }),

        catchError((err) => {
        console.log('err', err);
        return of([]);
      }),

      finalize(() => {
        this.loaderService.setLoader(false);
      })
    );
  }



 // getTours() {
 //   return this.toursApi.getTours();
 // }

  setTourType(type: ITourTypes): void{
    this.tourTypeSubject.next(type);
  }

  setTourDate(date: Date | null): void {
    this.tourDateSubject.next(date);
  }

 getTourById(id: string | null): Observable<ITour> {
  return this.getTours().pipe(
    map((tours: ITour[]) => {
      const tour = tours.find(t => t.id === id);
      if (!tour) throw new Error('Tour not found');
      return tour;
    })
  );
}



  
getCountryByCode(code: string) {
  return this.toursApi.getCountryByCode(code);}



  
  deleteTourById(id: string): Observable<any> {
  return this.toursApi.deleteTour(id).pipe(
    catchError((err) => {
      console.error('Ошибка при удалении тура:', err);
      return of(null);
    })
  );
}

}
