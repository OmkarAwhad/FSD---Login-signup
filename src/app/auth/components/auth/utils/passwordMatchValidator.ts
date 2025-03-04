import { FormGroup } from '@angular/forms';

export const passwordMatchValidator = (form: FormGroup) => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassoword')?.value;
  return password === confirmPassword ? null : { passwordMissMatch: true };
};
