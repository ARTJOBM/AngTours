import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITour } from '../models/tours';

@Injectable({ providedIn: 'root' })
export class CartService {

  
  private cartItems$ = new BehaviorSubject<ITour[]>([]);

 
  readonly items$ = this.cartItems$.asObservable();


  readonly count$ = this.cartItems$.pipe(
    map(items => items.length)
  );

  toggleCart(tour: ITour): void {
    const current = this.cartItems$.value;
    const isExist = current.some(i => i.id === tour.id);
    
    const updated = isExist
      ? current.filter(i => i.id !== tour.id)
      : [...current, tour];

    this.cartItems$.next(updated);
  }


  isInCart(tourId: string) {
    return this.cartItems$.pipe(
      map(items => items.some(item => item.id === tourId))
    );
  }
}
