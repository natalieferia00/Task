import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router'; // Importa Router
import { IonicModule } from '@ionic/angular';
import { ProjectService, Project, Task, Tag, Category } from '../services/project.service';

@Component({
    selector: 'app-projects-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink, IonicModule],
    templateUrl: './projects.page.html',
    styleUrl: './projects.page.scss'
})
export class ProjectsPageComponent implements OnInit {
    private fb = inject(FormBuilder);

    projects: Project[] = [];
    newProjectForm: FormGroup;
    
    // Lista de colores e íconos para los nuevos proyectos
    private projectIcons = ['folder-outline', 'calendar-outline', 'bar-chart-outline', 'cube-outline'];
    private projectColors = ['blue', 'green', 'yellow', 'purple'];

    constructor() {
        this.newProjectForm = this.fb.group({
            projectName: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadProjects();
    }

    ionViewWillLeave(): void {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement) {
        activeElement.blur();
      }
    }

    /**
     * Carga los proyectos desde localStorage.
     */
    loadProjects(): void {
        const storedProjects = localStorage.getItem('projects');
        this.projects = storedProjects ? JSON.parse(storedProjects) : [];
    }

    /**
     * Guarda la lista actual de proyectos en localStorage.
     */
    private saveProjects(): void {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    }

    /**
     * Agrega un nuevo proyecto a la lista y lo guarda.
     */
    addNewProject(): void {
        if (this.newProjectForm.valid) {
            const projectName = this.newProjectForm.value.projectName;
            const newId = this.projects.length > 0 ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
            
            const newProject: Project = {
                id: newId,
                name: projectName,
                tasks: [],
                tags: [],
                categories: [],
                icon: this.projectIcons[this.projects.length % this.projectIcons.length],
                color: this.projectColors[this.projects.length % this.projectColors.length],
                members: [],
                extraMembers: 0
            };

            this.projects.push(newProject);
            this.saveProjects();
            this.newProjectForm.reset();
        }
    }

    /**
     * Elimina un proyecto y lo guarda.
     */
    deleteProject(event: Event, projectId: number): void {
        event.stopPropagation();
        if (confirm('¿Estás seguro de que quieres eliminar este proyecto y todas sus tareas?')) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            this.saveProjects();
        }
    }

    /**
     * Edita un proyecto y lo guarda.
     */
    editProject(event: Event, project: Project): void {
        event.stopPropagation();
        const newName = prompt("Edita el nombre del proyecto:", project.name);
        if (newName !== null && newName.trim() !== '') {
            const updatedProject: Project = { ...project, name: newName };
            const index = this.projects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) {
                this.projects[index] = updatedProject;
                this.saveProjects();
            }
        }
    }
}
