import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OttypeComponent } from './ottype.component';

describe('OttypeComponent', () => {
  let component: OttypeComponent;
  let fixture: ComponentFixture<OttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
