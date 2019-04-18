import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryTypeListComponent } from './surgery-type-list.component';

describe('SurgeryTypeListComponent', () => {
  let component: SurgeryTypeListComponent;
  let fixture: ComponentFixture<SurgeryTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurgeryTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurgeryTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
