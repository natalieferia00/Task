import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodoListReusableComponent } from '../components/todo-list-reusable/todo-list-reusable.component';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TodoListReusableComponent
  ],
  templateUrl: './project-tasks.page.html',
  styleUrls: ['./project-tasks.page.scss']
})
export class ProjectTasksPage implements OnInit {
  private route = inject(ActivatedRoute);

  projectId?: number;

  ngOnInit(): void {
    // Suscribirse a los cambios de parámetros de la ruta para obtener el ID.
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
    });
  }
}