import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsComponent } from './tabs/tabs.page';
import { HomePage } from './home/home.page';
import { HabitsComponent } from './habits/habits.page';
import { ProjectsPageComponent } from './projects/projects.page';
import { ProjectTasksPage } from './project-tasks/project-tasks.page'; // Importa la nueva página

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'habits',
        component: HabitsComponent
      },
      {
        path: 'projects',
        component: ProjectsPageComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    // Ruta para la página de tareas de un proyecto específico
    // El :id es un parámetro que se pasará a través de la URL
    path: 'projects-tasks/:id',
    component: ProjectTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
