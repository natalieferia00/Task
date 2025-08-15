import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  completed: boolean;
}

interface StoredTask {
  id: number;
  text: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  completed: boolean;
  color: string;
}

@Component({
  selector: 'app-calendar-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-list.component.html',
  styleUrl: './calendar-list.component.scss',
})
export class CalendarListComponent implements OnInit {
  activeFilter: 'today' | 'week' | 'month' = 'today';
  currentDate = new Date();

  events: CalendarEvent[] = [];

  filteredEvents: CalendarEvent[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadEvents();
    this.filterEvents('today');
  }

  loadEvents(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks: StoredTask[] = JSON.parse(storedTasks);
      this.events = parsedTasks.map((task) => ({
        id: task.id,
        title: task.text,
        date: new Date(task.date),
        startTime: task.startTime,
        endTime: task.endTime,
        completed: task.completed,
      }));
    }
  }

  saveEvents(): void {
    const tasksToSave = this.events.map((event) => ({
      id: event.id,
      text: event.title,
      date: event.date.toISOString().split('T')[0],
      startTime: event.startTime,
      endTime: event.endTime,
      category: 'General',
      completed: event.completed,
      color: '#ffffff',
    }));
    localStorage.setItem('tasks', JSON.stringify(tasksToSave));
  }

  filterEvents(filter: 'today' | 'week' | 'month'): void {
    this.loadEvents();
    this.activeFilter = filter;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.filteredEvents = this.events.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);

      switch (this.activeFilter) {
        case 'today':
          return eventDate.getTime() === today.getTime();
        case 'week':
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        case 'month':
          return (
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        default:
          return true;
      }
    });

    this.filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  toggleCompletion(event: CalendarEvent): void {
    const taskToUpdate = this.events.find((e) => e.id === event.id);
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed;
      this.saveEvents();
    }
  }
}
