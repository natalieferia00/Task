import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TodoListReusableComponent } from './todo-list-reusable.component';

describe('TodoListReusableComponent', () => {
  let component: TodoListReusableComponent;
  let fixture: ComponentFixture<TodoListReusableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TodoListReusableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListReusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
