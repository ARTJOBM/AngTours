import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BasketService } from './../../services/basket.service';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-basket',
  imports: [TableModule, AsyncPipe, ButtonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  
  private router = inject(Router);
  private basketService = inject(BasketService);

  basketItems$ = inject(BasketService).basketStore$;

  deleteItem(tour: any): void {
    this.basketService.removeItemFromBasket(tour);
    console.log('Тур удален:', tour.name);
  }

  checkout(tour: any): void {
    this.router.navigate(['/order', tour.id || tour._id]); 
  }
}
