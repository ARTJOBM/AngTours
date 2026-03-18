import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { MenuComponent } from "./menu/menu.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date = new Date();

  private userService = inject(UserService);
  private router = inject(Router);

  get user() {
    return this.userService.getUser();
  }

  menuItems = [
    { route: '', title: 'Главная' },
    { route: 'settings', title: 'Настройки' },
    { route: 'auth', title: 'Авторизация' }
  ];

  logout() {
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    const raw = localStorage.getItem('user');
    if (raw) {
      this.userService.setUser(JSON.parse(raw));
    }

    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}