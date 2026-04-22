import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITour } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketStore: ITour[] = [];
  private basketSubject = new BehaviorSubject(this.basketStore);
  basketStore$ = this.basketSubject.asObservable();

  readonly count$ = this.basketStore$.pipe(map(items => items.length));

  constructor() { }

  setItemToBasket(item: ITour): void {
    this.basketStore.push(item);
    item.inBasket = true;
    this.basketSubject.next(this.basketStore);
  }

  removeItemFromBasket(item: ITour): void {
    this.basketStore = this.basketStore.filter((tour) => tour !== item);
    item.inBasket = false;
    this.basketSubject.next(this.basketStore);
  }
}
