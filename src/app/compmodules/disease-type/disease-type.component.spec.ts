import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseTypeComponent } from './disease-type.component';

describe('DiseaseTypeComponent', () => {
  let component: DiseaseTypeComponent;
  let fixture: ComponentFixture<DiseaseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
