import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DatePipe, AsyncPipe, NgIf } from '@angular/common';
import { MenuComponent } from "./menu/menu.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgZone } from '@angular/core';
import { BasketService } from '../../services/basket.service';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ITour } from '../../models/tours';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenuComponent, MatButtonModule, MatIconModule, NgIf, AsyncPipe, OverlayBadgeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dateTime!: Date;
  menuItems: any[] = [];
  user: any;
  logoutIcon = 'pi pi-user';
  basketStore$: Observable<ITour[]> | null = null;

 constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public basketService: BasketService,
  ) {} 

  date = new Date();
  
  initMenuItems() {
    return [
      { route: '', title: 'Главная' },
      { route: 'settings', title: 'Настройки' },
      { route: 'Orders', title: 'Заказы' },
    ];
  }

  logout() {
    this.router.navigate(['/auth']);
  }

  
  ngOnInit(): void {

     this.basketStore$ = this.basketService.basketStore$;
     
    this.user = this.userService.getUser();
    this.menuItems = this.initMenuItems();

    this.ngZone.runOutsideAngular(() => { 
    return setInterval(() => {
      this.date = new Date();
      this.cdr.detectChanges();
    }, 1000);
  })
}
}