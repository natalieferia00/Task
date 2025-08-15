import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { IonHeader, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonToolbar,
    IonHeader,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export class RegisterComponent {
  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registerError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      const { name, email, password } = this.form.getRawValue();
      if (this.authService.register({ name, email, password })) {
        this.router.navigate(['/']);
      } else {
        this.registerError = true;
      }
    }
  }
}
