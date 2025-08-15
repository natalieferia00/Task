import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  name: string;
  completed: boolean;
  dueDate: string;
}

@Component({
  selector: 'app-search-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchTasksComponent implements OnInit {
  searchTerm: string = '';

  allTasks: Task[] = [
    {
      id: 1,
      name: 'Planificar campaña de marketing',
      completed: false,
      dueDate: '2025-08-20',
    },
    {
      id: 2,
      name: 'Diseñar la landing page',
      completed: true,
      dueDate: '2025-08-15',
    },
    {
      id: 3,
      name: 'Escribir el contenido del blog',
      completed: false,
      dueDate: '2025-08-22',
    },
    {
      id: 4,
      name: 'Configurar el servidor de producción',
      completed: false,
      dueDate: '2025-08-25',
    },
    {
      id: 5,
      name: 'Revisar métricas de la última campaña',
      completed: true,
      dueDate: '2025-08-18',
    },
  ];

  filteredTasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    this.filteredTasks = [...this.allTasks];
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredTasks = [...this.allTasks];
      return;
    }

    this.filteredTasks = this.allTasks.filter((task) =>
      task.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onTaskCompletionChange(task: Task): void {
    console.log(`Tarea "${task.name}" completada: ${task.completed}`);
  }
}
