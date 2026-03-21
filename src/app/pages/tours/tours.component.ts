import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ToursService } from '../../services/tours.service';
import { ITour, IToursData } from '../../models/tours';

@Component({
  selector: 'app-tours',
  imports: [MatCardModule],
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  
  private toursService = inject(ToursService);

  tours: ITour[] = [];

  ngOnInit(): void {
    this.toursService.getTours().subscribe((toursdata: IToursData) => {
      this.tours = toursdata.tours;
    });
  }
}