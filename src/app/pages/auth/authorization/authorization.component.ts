import { Component, inject, NgModule, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from '../../../services/user.service';
import { UserApiService } from '../../../services/api/user-api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  imports: [FormsModule, NgClass, NgIf, MatButtonModule, MatCheckboxModule, MatSnackBarModule ],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit, OnDestroy {

  private userService = inject(UserService);
  private userApiService = inject(UserApiService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router)

  login = '';
  password = '';
  saveInStore = false;

  constructor( private userService2: UserService) {
    console.log('constr init');
  }

  ngOnInit(): void {
    console.log('auth init');
  }

  ngOnDestroy(): void {
    console.log('auth destroy');
  }

  onAuth(ev: Event): void {


    this.userApiService.auth({ login: this.login, password: this.password }).subscribe({
      next: () => {
        if (this.saveInStore) {
          this.userService.saveUserInStore({ login: this.login });
        } else {
          this.userService.setUser({ login: this.login });
        }

        this.router.navigate(["/"])

        this._snackBar.open('Успешная авторизация', 'OK', { duration: 2000 });
      },
      error: (err) => {
        this._snackBar.open('Ошибка авторизации', 'Закрыть', { duration: 2000 });
      }
    });
  }
}