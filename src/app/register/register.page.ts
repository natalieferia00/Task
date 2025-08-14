import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonToolbar, IonHeader, ReactiveFormsModule, RouterLink, CommonModule ],
  templateUrl: './register.page.html', // He renombrado el archivo .html para consistencia
  styleUrl: './register.page.scss'
})
export class RegisterComponent {
    // Inject FormBuilder to create the form group
    form = inject(FormBuilder).nonNullable.group({
        name: ['', [Validators.required]], // Nuevo campo para el nombre
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // Flag to show an error message if the user already exists
    registerError: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    // Submits the form, calls the auth service to register a new user
    onSubmit() {
        if (this.form.valid) {
            const { name, email, password } = this.form.getRawValue();
            if (this.authService.register({ name, email, password })) {
                // Navigate to the dashboard on successful registration
                this.router.navigate(['/']);
            } else {
                // Show error message on registration failure (user exists)
                this.registerError = true;
            }
        }
    }
}
