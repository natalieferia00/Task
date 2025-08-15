import { Injectable } from '@angular/core';
export interface Tag {
  name: string;
  color: string;
}

export interface Task {
  id: number;
  text: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  category?: string;
  completed: boolean;
  tags?: Tag[];
}

export interface Project {
  id: number;
  name: string;
  taskCount: number;
  icon: string;
  chartIcon: string;
  members: string[];
  extraMembers: number;
  color: string;
  tasks: Task[];
  categories: string[];
  categoryColors: { [key: string]: string };
  tags: Tag[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];

  constructor() {
    this.loadProjects();
  }

  addProject(projectName: string): void {
    const newProjectId =
      this.projects.length > 0
        ? Math.max(...this.projects.map((p) => p.id)) + 1
        : 1;
    const newProject: Project = {
      id: newProjectId,
      name: projectName,
      taskCount: 0,
      icon: 'folder-outline',
      chartIcon: 'bar-chart-sharp',
      members: [],
      extraMembers: 0,
      color: '#6200ea',
      tasks: [],
      categories: ['Work'],
      categoryColors: { Work: '#6200ea' },
      tags: [],
    };
    this.projects.push(newProject);
    this.saveProjects();
  }

  deleteProject(projectId: number): void {
    this.projects = this.projects.filter((project) => project.id !== projectId);
    this.saveProjects();
  }

  private loadProjects(): void {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
    } else {
      this.projects = [
        {
          id: 1,
          name: 'Proyecto de Marketing',
          taskCount: 2,
          icon: 'megaphone',
          chartIcon: 'pulse-sharp',
          members: ['https://placehold.co/100x100/A05151/FFFFFF?text=A'],
          extraMembers: 2,
          color: '#6200ea',
          tasks: [
            {
              id: 101,
              text: 'Planificar campaña en redes sociales',
              completed: false,
              category: 'Work',
              tags: [{ name: 'Urgente', color: '#f44336' }],
            },
            {
              id: 102,
              text: 'Crear contenido visual',
              completed: true,
              category: 'Work',
              tags: [],
            },
          ],
          categories: ['Work', 'Personal'],
          categoryColors: { Work: '#6200ea', Personal: '#03dac6' },
          tags: [
            { name: 'Urgente', color: '#f44336' },
            { name: 'Revisión', color: '#ffc107' },
          ],
        },
        {
          id: 2,
          name: 'Proyecto Personal',
          taskCount: 2,
          icon: 'walk',
          chartIcon: 'bar-chart-sharp',
          members: [
            'https://placehold.co/100x100/F58632/FFFFFF?text=B',
            'https://placehold.co/100x100/6200EA/FFFFFF?text=C',
          ],
          extraMembers: 0,
          color: '#03dac6',
          tasks: [
            {
              id: 201,
              text: 'Comprar víveres',
              completed: false,
              category: 'Shopping',
              tags: [{ name: 'Compras', color: '#e91e63' }],
            },
            {
              id: 202,
              text: 'Leer el libro de programación',
              completed: false,
              category: 'Study',
              tags: [],
            },
          ],
          categories: ['Study', 'Shopping'],
          categoryColors: { Study: '#ffc107', Shopping: '#e91e63' },
          tags: [
            { name: 'Compras', color: '#e91e63' },
            { name: 'Libros', color: '#2196f3' },
          ],
        },
      ];
      this.saveProjects();
    }
  }

  private saveProjects(): void {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find((p) => p.id === id);
  }

  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.saveProjects();
    }
  }

  addTaskToProject(
    projectId: number,
    taskData: Omit<Task, 'id' | 'completed'>
  ): void {
    const project = this.getProjectById(projectId);
    if (project) {
      const newId = Date.now();
      const newTask = { ...taskData, id: newId, completed: false };
      project.tasks.push(newTask);
      project.taskCount = project.tasks.length;
      this.updateProject(project);
    }
  }

  toggleTaskCompletion(projectId: number, taskId: number): void {
    const project = this.getProjectById(projectId);
    if (project) {
      const task = project.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.updateProject(project);
      }
    }
  }

  updateProjectTask(projectId: number, updatedTask: Task): void {
    const project = this.getProjectById(projectId);
    if (project) {
      const index = project.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        project.tasks[index] = updatedTask;
        this.updateProject(project);
      }
    }
  }

  deleteProjectTask(projectId: number, taskId: number): void {
    const project = this.getProjectById(projectId);
    if (project) {
      project.tasks = project.tasks.filter((task) => task.id !== taskId);
      project.taskCount = project.tasks.length;
      this.updateProject(project);
    }
  }

  addCategoryToProject(
    projectId: number,
    newCategory: { name: string; color: string }
  ): void {
    const project = this.getProjectById(projectId);
    if (project && !project.categories.includes(newCategory.name)) {
      project.categories.push(newCategory.name);
      project.categoryColors[newCategory.name] = newCategory.color;
      this.updateProject(project);
    }
  }

  deleteCategoryFromProject(projectId: number, categoryName: string): void {
    const project = this.getProjectById(projectId);
    if (project) {
      project.categories = project.categories.filter(
        (cat) => cat !== categoryName
      );
      delete project.categoryColors[categoryName];
      this.updateProject(project);
    }
  }

  addTagToProject(projectId: number, newTag: Tag): void {
    const project = this.getProjectById(projectId);
    if (project && !project.tags.some((tag) => tag.name === newTag.name)) {
      project.tags.push(newTag);
      this.updateProject(project);
    }
  }

  deleteTagFromProject(projectId: number, tagName: string): void {
    const project = this.getProjectById(projectId);
    if (project) {
      project.tags = project.tags.filter((tag) => tag.name !== tagName);
      project.tasks.forEach((task) => {
        if (task.tags) {
          task.tags = task.tags.filter((tag) => tag.name !== tagName);
        }
      });
      this.updateProject(project);
    }
  }
}
