import { Routes } from '@angular/router';
import { TabsComponent } from './tabs.page';

const routes: Routes = [
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
        loadChildren: () => import('../home/home.page').then(m => m.HomePage)
      },
      {
        path: 'habits',
        loadChildren: () => import('../habits/habits.page').then(m => m.HabitsComponent)
      },
      {
        path: 'projects',
        loadChildren: () => import('../projects/projects.page').then(m => m.ProjectsPageComponent)
      }
    ]
  }
];
