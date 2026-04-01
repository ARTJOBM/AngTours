import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToursService } from '../../services/tours.service';
import { ITour, IToursData } from '../../models/tours';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, NgxMasonryModule, MatButtonModule, DatePipe, HighlightActiveDirective],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  
  private toursService = inject(ToursService);
  private router = inject(Router)
  tours: any;

  ngOnInit(): void {
    this.toursService.getTours().subscribe((toursdata: IToursData) => {
      this.tours = toursdata.tours;
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
}