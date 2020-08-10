import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesplotComponent } from './issuesplot.component';

describe('IssuesplotComponent', () => {
  let component: IssuesplotComponent;
  let fixture: ComponentFixture<IssuesplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
