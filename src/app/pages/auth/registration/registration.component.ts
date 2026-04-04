import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { UserApiService } from '../../../services/api/user-api.service';

export interface IRegistrationRequest {
  login: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-registration',
  imports: [ FormsModule, NgClass, NgIf, MatButtonModule, MatCheckboxModule, MatSnackBarModule, ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {

  private userService = inject(UserService);
  private userApiService = inject(UserApiService);
  private _snackBar = inject(MatSnackBar);

  login = '';
  email = '';
  password = '';
  passwordRepeat = '';
  saveInStore = false;

  onRegister(ev: Event): void {
    ev.preventDefault();

    if (this.password !== this.passwordRepeat) {
      this._snackBar.open('Пароли не совпадают', 'Закрыть', { duration: 2000 });
      return;
    }

    const body: IRegistrationRequest = {
      login: this.login,
      email: this.email,
      password: this.password,
    };



    this.userApiService.register(body).subscribe({
      next: () => {
        if (this.saveInStore) {
          this.userService.saveUserInStore({ login: this.login });
        } else {
          this.userService.setUser({ login: this.login });
        }

        this._snackBar.open('Успешная регистрация', 'OK', { duration: 2000 });
      },
      error: () => {
        this._snackBar.open('Ошибка регистрации', 'Закрыть', { duration: 2000 });
      },
    });
  }
}