import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

import { DashboardHeaderComponent } from "../home/dashboard-header/dashboard-header.component";
import { TabsComponent } from "../tabs/tabs.page";
import { TodoListComponent } from "../home/todo-list/todo-list.component";
import { AuthService } from '../services/auth';
import { ProjectService } from '../services/project';
import { SearchTasksComponent } from "../home/search-tasks/search-tasks.component";
import { ProgressChartComponent } from "../home/progress-chart/progress-chart.component";
import { CalendarListComponent } from "../home/calendar-list/calendar-list.component";
import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/angular/standalone";
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { IonicModule } from "@ionic/angular";


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [IonContent, IonTitle, IonToolbar, IonHeader,
    CommonModule,
    DashboardHeaderComponent,
    TodoListComponent,
    ReactiveFormsModule,
    SearchTasksComponent,
    ProgressChartComponent,
    CalendarListComponent,
    RouterModule, TabsComponent, SidebarComponent, IonicModule],
    templateUrl: './home.page.html',
    styleUrl: './home.page.scss'
})
export class HomePage implements OnInit {
addNewProject() {
throw new Error('Method not implemented.');
}
    private authService = inject(AuthService);
    private projectService = inject(ProjectService);
    private fb = inject(FormBuilder);

    currentUser: any | null = null;
    projects: any[] = [];
    
    newProjectForm: FormGroup;

    constructor() {
        this.newProjectForm = this.fb.group({
            projectName: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            if (!this.currentUser.profileImage) {
                this.currentUser.profileImage = 'https://placehold.co/100x100/4B6CB7/FFFFFF?text=User';
            }
            this.currentUser.taskCount = 5; // Esto podría ser dinámico según las tareas totales del usuario
        }

        this.loadProjects(); // Cargar los proyectos al iniciar
    }

    // Método para cargar los proyectos desde el servicio
    loadProjects(): void {
        this.projects = this.projectService.getProjects();
    }

 

    // Método para eliminar un proyecto
    deleteProject(event: Event, projectId: number): void {
        event.stopPropagation(); // Evita que el routerLink se active al hacer clic en el icono de eliminar
        if (confirm('¿Estás seguro de que quieres eliminar este proyecto y todas sus tareas?')) {
            this.projectService.deleteProject(projectId);
            this.loadProjects(); // Volver a cargar los proyectos para actualizar la vista
        }
    }
}
