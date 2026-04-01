import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { MenuComponent } from "./menu/menu.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenuComponent, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
 private cdr = inject(ChangeDetectorRef);

  
  date = new Date();
  
  private userService = inject(UserService);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  get user() {
    return this.userService.getUser();
  }

  menuItems = [
    { route: '', title: 'Главная' },
    { route: 'settings', title: 'Настройки' },
    /*{ route: 'auth', title: 'Авторизация' } */
  ];

  logout() {
    this.router.navigate(['/auth']);
  }

  
  ngOnInit(): void {
    const raw = localStorage.getItem('user');
    if (raw) {
      this.userService.setUser(JSON.parse(raw));
    }

    this.ngZone.runOutsideAngular(() => { 
    return setInterval(() => {
      this.date = new Date();
      this.cdr.detectChanges();
    }, 1000);
  })
}
}