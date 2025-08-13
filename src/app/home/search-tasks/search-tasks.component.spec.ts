import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchTasksComponent } from './search-tasks.component';

describe('SearchTasksComponent', () => {
  let component: SearchTasksComponent;
  let fixture: ComponentFixture<SearchTasksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SearchTasksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
