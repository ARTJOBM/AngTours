import { Injectable, signal, computed } from '@angular/core';
import { ITour } from '../models/tours';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<ITour[]>([]);

  // Для счетчика в шапке
  readonly count = computed(() => this.cartItems().length);

  toggleCart(tour: ITour): void {
    this.cartItems.update(items => 
      items.some(i => i.id === tour.id) 
        ? items.filter(i => i.id !== tour.id) // Удаляем
        : [...items, tour]                   // Добавляем
    );
  }

  isInCart(tourId: string): boolean {
    return this.cartItems().some(item => item.id === tourId);
  }
}
