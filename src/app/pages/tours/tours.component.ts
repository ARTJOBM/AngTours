import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToursService } from '../../services/tours.service';
import { ITour, IToursData, ITourTypes, IWeatherData, ILocation } from '../../models/tours';
import { NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { ChangeDetectorRef } from '@angular/core';
import { MatInputModule} from  '@angular/material/input' ;
import { MatFormFieldModule} from  '@angular/material/form-field' ;
import { Subject, Subscription, debounceTime, fromEvent, takeUntil } from 'rxjs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MapComponent } from '../../shared/component/map/map.component';
import { CartService } from '../../services/cart.service';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-tours',
  imports: [
  MatCardModule,
  NgxMasonryModule, 
  MatButtonModule, 
  DatePipe, 
  HighlightActiveDirective, 
  NgIf, 
  MatFormFieldModule, 
  MatInputModule, 
  NzModalModule, 
  MapComponent,
  MatIconModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],

  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToursComponent implements OnInit, AfterViewInit, OnDestroy  {
  @ViewChild ('hightLightDirective', {read: HighlightActiveDirective}) hightLightDirective!: HighlightActiveDirective;
  @ViewChild (NgxMasonryComponent) masonry!: NgxMasonryComponent;
  @ViewChild ('inputSearch') inputSearch!: ElementRef;
  
  private toursService = inject(ToursService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  public  cartService = inject(CartService);

  toggleCart(item: ITour, event: MouseEvent) {
    event.stopPropagation();
    this.cartService.toggleCart(item);
  }

  tours: any;
  toursCopy: ITour[] = [];
  updateMasonryLayout: boolean | null = null;
  showMasonry = true;
  noResults = false;
  //showModal: boolean = false;
  //mapCountryName: string | undefined = undefined;
  selectedLocation: ILocation | null = null;
  masonryOptions: NgxMasonryOptions = {animations: {}
}

typeTourFilter: ITourTypes | null = null;
selectedDate: Date | null = null;
searchValue: string = '';
tours$ = this.toursService.getTours();
//typeUnsubscriber: Subscription;
//dateUnsubscriber: Subscription;
private _unsubscriber = new Subject(); // Общая подписка для управления отписками (Until)
public showModal = false;
public mapCountryName: string | undefined = undefined;
location!: ILocation;
weatherData!: IWeatherData;




ngAfterViewInit(): void {
    fromEvent<InputEvent>(this.inputSearch.nativeElement,'input')
      .pipe(
        debounceTime(300),
        takeUntil(this._unsubscriber)
      )
      .subscribe((value) => {
        console.log('input');
        this.searchValue = (value.target as HTMLInputElement).value;
        this.initTourFilterLogic();
      });
  }

  ngOnInit(): void {
    this.toursService.getTours().pipe(takeUntil(this._unsubscriber)).subscribe((tours: ITour[]) => {
      this.tours = tours;
      this.toursCopy = [...this.tours];
      this.cdr.detectChanges();
    });

    this.toursService.tourType$.pipe(takeUntil(this._unsubscriber)).subscribe((tour) => {
      this.typeTourFilter = tour;
      this.initTourFilterLogic();
      
    console.log('tour', tour)  
    });

    this.toursService.tourDate$.pipe(takeUntil(this._unsubscriber)).subscribe((date) => {
      this.selectedDate = date;
      this.initTourFilterLogic();
    });
  }

ngOnDestroy(): void {
    this._unsubscriber.next(true);
    this._unsubscriber.complete();
  }


  goToTour(tour: ITour):void {
    if (tour?.id) {
      this.router.navigate([`tour/${tour.id}`])
    }
  }

sort(item1: HTMLElement, item2: HTMLElement): number {

  if( parseFloat(item1.style.top) == parseFloat(item2.style.top)) {
    return parseFloat(item1.style.left) < parseFloat (item2.style.left) ? -1 : 1;
  } else {
    return parseFloat(item1.style.top) - parseFloat (item2.style.top);
  }
} 

onEnter(ev: {el: HTMLElement, index: number}) {
const tourId = ev.el.getAttribute('data-tour-id');
if (tourId) {
  this.goToTour({ id: tourId} as ITour);
}
console.log('tourId', tourId);
}

searchTours(ev: InputEvent): void {
    this.searchValue = (ev.target as HTMLInputElement).value;
    this.initTourFilterLogic();
  }

updateView(): void {
  setTimeout(() => {
    this.hightLightDirective.initItems();
  });
}


initTourFilterLogic(): void {
//logic for type

let filteredArr = [...this.toursCopy];
  if (this. typeTourFilter) {
    switch(this.typeTourFilter) {
  case 'group':
    filteredArr = this.toursCopy.filter((el)=> el.type === 'multi');
    break;
    case 'single':
    filteredArr = this.toursCopy.filter((el)=> el.type === 'single');
    break;
    case 'all':
    filteredArr = [...this.toursCopy];
    break;
}
  }

//дата тура

if (this.selectedDate) {
  const selected = this.selectedDate.toDateString();

  filteredArr = filteredArr.filter(t => {
    if (!t.date) return false;
    const tourDate = new Date(t.date);
    return tourDate.toDateString() === selected;
  });
}

//if (this.selectedDate) {
//    const selected = this.selectedDate.toISOString().split('T')[0];
//    filteredArr = filteredArr.filter(t => t.date === selected);
//  }


// поиск по названию

if (this.searchValue.trim()) {
    const regExp = new RegExp(this.searchValue, 'i');
    filteredArr = filteredArr.filter(t => regExp.test(t.name));
  }

  this.tours = filteredArr;
  this.noResults = filteredArr.length === 0;



  setTimeout(() => {
    this.masonry.reloadItems();
    this.masonry.layout();
  }
  )
}
showMap(tour: ITour, ev: Event, code: string): void {
  this.mapCountryName = tour.country?.name_ru;
  
  ev.stopPropagation();
  this.toursService.getCountryByCode(code).subscribe((data) => {
    if (data) {
    const countrieInfo = data.countrieData;
    console.log('countrieInfo', countrieInfo);

    this.location = { 
        lat: countrieInfo.latlng[0], 
        lng: countrieInfo.latlng[1] 
      };


    this.weatherData = data.weatherDate;
    this.showModal = true;
    this.cdr.detectChanges();
  }
});

}
addToCart(item: ITour, event: MouseEvent) { 
  event.stopPropagation();
  this.cartService.toggleCart(item); // вызываем новый метод из сервиса
}

}