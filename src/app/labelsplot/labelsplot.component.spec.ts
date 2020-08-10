import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsplotComponent } from './labelsplot.component';

describe('LabelsplotComponent', () => {
  let component: LabelsplotComponent;
  let fixture: ComponentFixture<LabelsplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelsplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
