import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseTypeListComponent } from './disease-type-list.component';

describe('DiseaseTypeListComponent', () => {
  let component: DiseaseTypeListComponent;
  let fixture: ComponentFixture<DiseaseTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
