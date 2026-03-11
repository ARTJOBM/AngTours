import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-authorization',
  imports: [FormsModule, NgClass, NgIf, MatButtonModule, MatCheckboxModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent {
  private userService = inject(UserService);
  login = '';
  password = '';
  saveInStore = false;

  constructor(private userService2: UserService){

  }

  onAuth(ev: Event): void {
  if(this.saveInStore){
    this.userService.saveUserInStore({login: this.login});
  } else {
    this.userService.setUser({login: this.login});
  }
  }
}
