import { inject, Inject, Injectable, OnInit } from "@angular/core";
import { TourApiService } from "./api/tour-api.service";
import { ITour, ITourTypes, ICountriesResponseItem, IToursData, IToursServerRes, IOrder } from "../models/tours";
import { delay, forkJoin, Observable, Subject, } from "rxjs";
import { map, catchError, finalize } from 'rxjs/operators';
import { of,  } from 'rxjs';
import { LoaderService } from "../services/loader.service";
import { API } from "../shared/api";
import { HttpClient } from "@angular/common/http";
import { withLatestFrom } from "rxjs/operators";
import { BasketService } from "./basket.service";

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
  private http = inject(HttpClient);
  private apiConfig = inject(API); 
  private basketService = inject(BasketService); 

  constructor() {}

  getTours(): Observable<ITour[]> {
    const countries$ = this.toursApi.getCountries();
    const tours$ = this.toursApi.getTours();

    this.loaderService.setLoader(true);

    return forkJoin<[ICountriesResponseItem [], IToursServerRes]>([countries$, tours$]).pipe(
      delay(1000),

      withLatestFrom(this.basketService.basketStore$),
      
      map(([data, basketData]) => {
        
        console.log('data', data);

        let toursWithCountries: ITour[] = [];
        const toursArr = data[1].tours;
        const countriesMap = new Map();

        data[0].forEach(country => {
          countriesMap.set(country.iso_code2, country);
        });

        if (Array.isArray(toursArr)) {
          toursWithCountries = toursArr.map<ITour>((tour) => {

         const isTourInBasket = basketData.find((basketTour: ITour) => basketTour.id === tour.id);
          
         if (isTourInBasket) {
              (tour as any).inBasket = true;
            }

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

 postOrder (orderBody: IOrder): Observable<any> {  
    return this.http.post<any>(this.apiConfig.order, orderBody);
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
