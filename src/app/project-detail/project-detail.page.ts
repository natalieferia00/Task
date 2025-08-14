import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {  TodoListReusableComponent } from "../components/todo-list-reusable/todo-list-reusable.component";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TodoListReusableComponent]
})
export class ProjectDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
