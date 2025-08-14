import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, ReactiveFormsModule, RouterLink, CommonModule, ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginComponent {
    // Inject FormBuilder to create the form group
    form = inject(FormBuilder).nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
    // Flag to show an error message on failed login
    loginError: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    // Submits the form, calls the auth service to log in
    onSubmit() {
        if (this.form.valid) {
            const { email, password } = this.form.getRawValue();
            if (this.authService.login({ email, password })) {
                // Navigate to the dashboard on successful login
                this.router.navigate(['/']);
            } else {
                // Show error message on failure
                this.loginError = true;
            }
        }
    }
}
