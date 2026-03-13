import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private userService = inject(UserService);

  get user() {
    return this.userService.getUser();
  }

  ngOnInit(): void {
    const raw = localStorage.getItem('user');
    if (raw) {
      this.userService.setUser(JSON.parse(raw));
    }
  }
}