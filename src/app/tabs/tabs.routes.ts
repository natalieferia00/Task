import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent} from './tabs.page';

const routes: Routes = [
  {
    path: '', // La ruta padre ya no es 'tabs', sino la ruta vacía, ya que este es el módulo de enrutamiento para las pestañas.
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then(m => m.HomePage)
      },
      {
        path: 'projects',
        loadComponent: () => import('../projects/projects.page').then(m => m.ProjectsPageComponent)
      },
      {
        path: 'habits',
        loadComponent: () => import('../habits/habits.page').then(m => m.HabitsComponent)
      },
      {
        path: '',
        redirectTo: 'home', // La redirección ahora es relativa.
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
