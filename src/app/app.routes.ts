import { Routes } from '@angular/router';

import { TabsPage } from './tabs/tabs.page';
import { HomePage } from './home/home.page';
import { HabitsPage } from './habits/habits.page';
import { ProjectsPage } from './projects/projects.page';

// Rutas de la aplicación
export const routes: Routes = [
  // Ruta por defecto que redirige a la página de inicio con pestañas
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  // La ruta 'tabs' es el componente principal con la navegación
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'habits',
        component: HabitsPage,
      },
      {
        path: 'projects',
        component: ProjectsPage,
      },
      // Redirige a 'home' si el usuario navega a '/tabs' sin una ruta específica
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  // Redirección para cualquier otra ruta no encontrada
  {
    path: '**',
    redirectTo: 'tabs/home',
  },
];
