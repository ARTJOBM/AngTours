import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToursService } from '../../services/tours.service';
import { ITour, IToursData, ITourTypes } from '../../models/tours';
import { NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { ChangeDetectorRef } from '@angular/core';
import {MatInputModule} from  '@angular/material/input' ;
import {MatFormFieldModule} from  '@angular/material/form-field' ;
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, NgxMasonryModule, MatButtonModule, DatePipe, HighlightActiveDirective, NgIf, MatFormFieldModule, MatInputModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss'],

  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToursComponent implements OnInit, AfterViewInit {
  @ViewChild ('hightLightDirective', {read: HighlightActiveDirective}) hightLightDirective!: HighlightActiveDirective;
  @ViewChild (NgxMasonryComponent) masonry!: NgxMasonryComponent;
  @ViewChild ('inputSearch') inputSearch!: ElementRef;
  
  private toursService = inject(ToursService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  tours: any;
  toursCopy: ITour[] = [];
  updateMasonryLayout: boolean | null = null;
  showMasonry = true;
  noResults = false;
  masonryOptions: NgxMasonryOptions = {animations: {}

}

typeTourFilter: ITourTypes | null = null;
selectedDate: Date | null = null;
searchValue: string = '';

tours$ = this.toursService.getTours();


ngAfterViewInit(): void {
fromEvent<InputEvent>(this.inputSearch.nativeElement,'input')
.pipe(debounceTime(300))
.subscribe((value) => {
console.log('input')

this.searchValue = (value.target as HTMLInputElement).value;
this.initTourFilterLogic();

//this.cdr.markForCheck();
});

}

  ngOnInit(): void {
    this.toursService.getTours().subscribe((toursdata: IToursData) => {
      this.tours = toursdata.tours;
      this.toursCopy = [...this.tours];
      this.cdr.detectChanges();
    });

    this.toursService.tourType$.subscribe((tour) => {
      this.typeTourFilter = tour;
      this.initTourFilterLogic();
      
    console.log('tour', tour)  
    });

    this.toursService.tourDate$.subscribe((date) => {
      this.selectedDate = date;
      this.initTourFilterLogic();
    });
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

let filteredArr = [...this.tours]
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


}