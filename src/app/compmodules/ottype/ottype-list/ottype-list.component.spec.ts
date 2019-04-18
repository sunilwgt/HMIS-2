import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OttypeListComponent } from './ottype-list.component';

describe('OttypeListComponent', () => {
  let component: OttypeListComponent;
  let fixture: ComponentFixture<OttypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OttypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OttypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
