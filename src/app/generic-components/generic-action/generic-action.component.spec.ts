import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericActionComponent } from './generic-action.component';

describe('GenericActionComponent', () => {
  let component: GenericActionComponent;
  let fixture: ComponentFixture<GenericActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
