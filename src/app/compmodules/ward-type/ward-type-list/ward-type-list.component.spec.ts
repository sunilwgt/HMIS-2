import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardTypeListComponent } from './ward-type-list.component';

describe('WardTypeListComponent', () => {
  let component: WardTypeListComponent;
  let fixture: ComponentFixture<WardTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
