import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterAppComponent } from './toaster.component';

describe('ToasterAppComponent', () => {
  let component: ToasterAppComponent;
  let fixture: ComponentFixture<ToasterAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToasterAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
