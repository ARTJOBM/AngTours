import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-registration',
  imports: [FormsModule, NgClass, NgIf, MatButtonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  login = '';
  email = '';
  password = '';
  passwordRepeat = '';

  onAuth(ev: Event): void {
    console.log('Регистрация:', {
      login: this.login,
      email: this.email,
      password: this.password,
      passwordRepeat: this.passwordRepeat
    });
  }
}
