import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../utils/passwordMatchValidator';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: passwordMatchValidator }
    );
  }
  registerSubmit() {
    if (this.registerForm.valid) {
      console.log('Success ' + this.registerForm.value);
      console.log('Success ' + JSON.stringify(this.registerForm.value));

      this.authService.registerUser(this.registerForm.value).subscribe(
        (res: any) => {
          console.log(res);
          if (res.token) {
            localStorage.setItem('token', res.token);
            alert('Registration done');
          } else {
            console.error('Error : No token received in response');
          }
        },
        (error: any) => {
          console.error('Registration failed : ', error);
        }
      );
    } else {
      console.log(this.registerForm.value);
      this.printErrors();
    }
  }
  printErrors() {
    const controls = this.registerForm.controls;
    // am I accessing / trying to get controlelrs array
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
