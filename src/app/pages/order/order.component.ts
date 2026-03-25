import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);

  tour: any;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get(`http://localhost:3000/tour/${id}`).subscribe((data) => {
      this.tour = data;
    });
  }
}