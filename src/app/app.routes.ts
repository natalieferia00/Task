import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.page';
import { RegisterComponent } from './register/register.page';
import { TabsComponent } from './tabs/tabs.page';
import { HomePage } from './home/home.page';
import { HabitsComponent } from './habits/habits.page';
import { ProjectsPageComponent } from './projects/projects.page';
import { ProjectTasksPage } from './project-tasks/project-tasks.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'habits',
        component: HabitsComponent,
      },
      {
        path: 'projects',
        component: ProjectsPageComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'projects-tasks/:id',
    component: ProjectTasksPage,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
