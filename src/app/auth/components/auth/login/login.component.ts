import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../utils/passwordMatchValidator';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator }
    );
  }
  loginSubmit() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        (res: any) => {
          console.log('Response from server:', res);

          if (res.token) {
            localStorage.setItem('token', res.token);
            console.log('Token stored in localStorage:', res.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error: No token received in response');
          }
        },
        (error: any) => {
          console.error('Login failed:', error);
        }
      );
    } else {
      console.log('Form is invalid:', this.loginForm.value);
    }
  }

  printErrors() {
    const controls = this.loginForm.controls;
    for (const controllerName in controls) {
      const control = controls[controllerName];
      if (control.invalid && control.touched) {
        const errors = control.errors;
        if (errors) {
          console.log(`${controllerName} has the following errors:`);
          for (const error in errors) {
            console.log(`- ${error}: ${JSON.stringify(errors[error])}`);
          }
        }
      }
    }
  }
}
