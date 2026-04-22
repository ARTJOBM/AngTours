import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ITour } from '../../models/tours';

@Component({
  selector: 'app-order',
  imports: [RouterLink],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  tourId: string | null = null;
  tour: ITour | null = null;


  constructor(
    private tourService: ToursService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourId).subscribe((tour: ITour) => {
      this.tour = tour;
    });
  }
}
