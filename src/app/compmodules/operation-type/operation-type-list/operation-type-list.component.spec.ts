import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationTypeListComponent } from './operation-type-list.component';

describe('OperationTypeListComponent', () => {
  let component: OperationTypeListComponent;
  let fixture: ComponentFixture<OperationTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
