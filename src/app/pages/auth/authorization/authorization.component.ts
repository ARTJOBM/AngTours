import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
   selector: 'app-authorization',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent {
  private fb = inject(FormBuilder);


  form: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    login: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  get loginCtrl() {
    return this.form.controls.login;
  }
  get passwordCtrl() {
    return this.form.controls.password;
  }


  get loginLenErr(): boolean {
    return this.loginCtrl.touched && !!this.loginCtrl.errors?.['minlength'];
  }
  get passwordLenErr(): boolean {
    return this.passwordCtrl.touched && !!this.passwordCtrl.errors?.['minlength'];
  }


  onLoginClick(): void {
    this.form.markAllAsTouched(); 

    if (this.form.invalid) {
      return;
    }

    const { login, password } = this.form.getRawValue();

    
    console.log('AUTH REQUEST →', { login, password });
  }
}