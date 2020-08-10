import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlateSpinnerComponent } from './plate-spinner.component';

describe('PlateSpinnerComponent', () => {
  let component: PlateSpinnerComponent;
  let fixture: ComponentFixture<PlateSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlateSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
