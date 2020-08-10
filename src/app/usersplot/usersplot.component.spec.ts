import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPlotComponent } from './usersplot.component';

describe('UsersPlotComponent', () => {
  let component: UsersPlotComponent;
  let fixture: ComponentFixture<UsersPlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
