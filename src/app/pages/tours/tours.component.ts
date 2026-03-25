import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToursService } from '../../services/tours.service';
import { ITour, IToursData } from '../../models/tours';
import { NgxMasonryModule } from 'ngx-masonry';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule, NgxMasonryModule, MatButtonModule, DatePipe],
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
  goToTour(tour:any):void {
    if (tour?.id) {
      this.router.navigate([`tour/${tour.id}`])
    }
  }
}