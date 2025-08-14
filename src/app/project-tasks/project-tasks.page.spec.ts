import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectTasksPage } from './project-tasks.page';

describe('ProjectTasksPage', () => {
  let component: ProjectTasksPage;
  let fixture: ComponentFixture<ProjectTasksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
