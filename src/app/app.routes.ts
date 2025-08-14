import { Routes, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// Importamos todos los componentes
import { HomePage } from './home/home.page';
import { HabitsComponent } from './habits/habits.page';
import { TabsComponent} from './tabs/tabs.page'; // Corregido: TabsPage en lugar de TabsComponent
import { LoginComponent } from './login/login.page';
import { RegisterComponent } from './register/register.page';
import { ProjectsPageComponent } from './projects/projects.page';
import { ProjectDetailPage } from './project-detail/project-detail.page';



// Importamos el servicio de autenticación
import { AuthService } from './services/auth';

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};

export const routes: Routes = [
    // Rutas de autenticación
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Rutas de la aplicación principal, protegidas por el `authGuard`
    {
        path: '',
        component: TabsComponent,
        canActivate: [authGuard],
        children: [
            // Redirección por defecto a 'home'
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePage },
            { path: 'habits', component: HabitsComponent },
            { path: 'projects', component: ProjectsPageComponent },
        ]
    },
    {
        path: 'project-detail',
        component: ProjectDetailPage,
        canActivate: [authGuard]
    },

    // Comodín para rutas no encontradas, redirige al login
    { path: '**', redirectTo: 'login' }
];
