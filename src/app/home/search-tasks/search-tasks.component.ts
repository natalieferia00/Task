import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseConfig } from 'src/app/firebase.component';
import { getValue } from 'firebase/remote-config';

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

@Component({
  selector: 'app-search-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-tasks.component.html',
  styleUrl: './search-tasks.component.scss',
})
export class SearchTasksComponent implements OnInit {
  searchTerm: string = '';

  allTasks: Task[] = [];

  filteredTasks: Task[] = [];
  showsearchbox = true;

  constructor(public firebaseRemoteConfig: FirebaseConfig) {
    this.showsearchbox = getValue(
      firebaseRemoteConfig.getRemoteConfig(),
      'showsearchbox'
    ).asBoolean();
    console.log(getValue(
      firebaseRemoteConfig.getRemoteConfig(),
      'showsearchbox'
    ))
  }

  ngOnInit(): void {
    this.loadAllTasksFromLocalStorage();

    this.filteredTasks = [...this.allTasks];
  }

  loadAllTasksFromLocalStorage(): void {
    this.allTasks = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith('tasks-')) {
        try {
          const storedTasks = localStorage.getItem(key);
          if (storedTasks) {
            const tasks = JSON.parse(storedTasks) as Task[];
            this.allTasks = this.allTasks.concat(tasks);
          }
        } catch (error) {
          console.error(
            `Error al parsear tareas desde la clave ${key}:`,
            error
          );
        }
      }
    }
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredTasks = [...this.allTasks];
    } else {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredTasks = this.allTasks.filter((task) =>
        task.text.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  }
}
