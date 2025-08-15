// project.service.ts
import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface Tag {
  name: string;
  color: string;
}

export interface Category {
  name: string;
  color: string;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
  tags: Tag[];
  categories: Category[];
  icon?: string;
  color?: string;
  members?: string[];
  extraMembers?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      name: 'Proyecto de Ejemplo 1',
      tasks: [],
      tags: [],
      categories: [],
      icon: 'folder-open-outline',
      color: 'blue',
      members: ['https://ionicframework.com/docs/demos/src/assets/avatar.svg'],
      extraMembers: 2,
    },
    {
      id: 2,
      name: 'Proyecto de Ejemplo 2',
      tasks: [],
      tags: [],
      categories: [],
      icon: 'calendar-outline',
      color: 'green',
      members: ['https://ionicframework.com/docs/demos/src/assets/avatar.svg'],
      extraMembers: 1,
    },
  ];

  constructor() {}

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }

  addProject(projectName: string): void {
    const newId =
      this.projects.length > 0
        ? Math.max(...this.projects.map((p) => p.id)) + 1
        : 1;
    const newProject: Project = {
      id: newId,
      name: projectName,
      tasks: [],
      tags: [],
      categories: [],
      icon: 'folder-outline',
      color: 'yellow',
      members: [],
      extraMembers: 0,
    };
    this.projects.push(newProject);
  }

  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }

  deleteProject(projectId: number): void {
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
