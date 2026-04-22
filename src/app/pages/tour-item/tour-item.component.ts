
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tour-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss'
})
export class TourItemComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  tour: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get(`http://localhost:3000/tour/${id}`).subscribe((data) => { this.tour = data;});
    
  }

  goToOrder() {
    this.router.navigate(['/order', this.tour.id]);
  }
}