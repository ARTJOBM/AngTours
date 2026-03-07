import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);


  form: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
    passwordRepeat: FormControl<string>;
    email: FormControl<string>;
  }> = this.fb.group({
    login: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    passwordRepeat: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  // Геттеры 

  get loginCtrl()         { return this.form.controls.login; }
  get passwordCtrl()      { return this.form.controls.password; }
  get passwordRepeatCtrl(){ return this.form.controls.passwordRepeat; }
  get emailCtrl()         { return this.form.controls.email; }

  // Флаги ошибок длины

  get loginLenErr(): boolean {
    return this.loginCtrl.touched && !!this.loginCtrl.errors?.['minlength'];
  }
  get passwordLenErr(): boolean {
    return this.passwordCtrl.touched && !!this.passwordCtrl.errors?.['minlength'];
  }
  get passwordRepeatLenErr(): boolean {
    return this.passwordRepeatCtrl.touched && !!this.passwordRepeatCtrl.errors?.['minlength'];
  }

  // Несовпадение паролей 

  get passwordMismatchErr(): boolean {
    return (
      this.passwordRepeatCtrl.touched &&
      this.passwordRepeatCtrl.value !== this.passwordCtrl.value
    );
  }

  // Наличие ошибок у email

  get emailErr(): boolean {
    return this.emailCtrl.touched && !!this.emailCtrl.errors;
  }

  onRegisterClick(): void {
   

    this.form.markAllAsTouched();

    // запрещаем отправку если есть ошибка 

    if (this.form.invalid || this.passwordMismatchErr) {
      return;
    }

    const { login, password, email } = this.form.getRawValue();


    console.log('REGISTRATION REQUEST →', { login, password, email });


  }
}