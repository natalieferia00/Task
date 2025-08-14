import { Routes, CanActivateFn, Router, CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';

// Importamos todos los componentes
import { HomePage } from './home/home.page';
import { HabitsComponent } from './habits/habits.page';
import { TabsComponent} from './tabs/tabs.page';
import { LoginComponent } from './login/login.page';
import { RegisterComponent } from './register/register.page';
import { ProjectsPageComponent } from './projects/projects.page';
import { ProjectDetailPage } from './project-detail/project-detail.page';

// Importamos el servicio de autenticación
import { AuthService } from './services/auth';

// 1. Nuevo y mejorado authGuard
// Ahora usamos CanMatchFn, que es más adecuado para rutas de carga perezosa
export const authGuard: CanMatchFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLoggedIn()) {
        return true; // Si el usuario está logueado, permite el acceso a la ruta
    } else {
        // Si no está logueado, navega al login y devuelve falso
        router.navigate(['/login']);
        return false;
    }
};

export const routes: Routes = [
    // 2. Rutas de autenticación
    // Estas rutas no están protegidas
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // 3. Ruta principal de la aplicación, protegida por el authGuard
    {
        path: '',
        redirectTo: '/tabs/home', // Redirige a la ruta protegida
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        // Usamos canMatch para proteger la ruta padre de las pestañas
        // Si la validación pasa, el enrutador buscará la ruta hija correspondiente
        // Si no, la redirección se maneja en el propio `authGuard`
        canMatch: [authGuard],
        component: TabsComponent,
        children: [
            // El children path vacío redirige a 'home' si se accede a '/tabs'
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomePage },
            { path: 'habits', component: HabitsComponent },
            { path: 'projects', component: ProjectsPageComponent },
        ]
    },
    {
        path: 'project-detail',
        component: ProjectDetailPage,
        // Usamos canMatch aquí también para proteger esta ruta individualmente
        canMatch: [authGuard]
    },

    // Comodín para rutas no encontradas, redirige al login
    { path: '**', redirectTo: 'login' }
];
