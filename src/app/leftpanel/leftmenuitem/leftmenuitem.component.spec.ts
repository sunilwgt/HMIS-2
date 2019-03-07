import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftmenuitemComponent } from './leftmenuitem.component';

describe('LeftmenuitemComponent', () => {
  let component: LeftmenuitemComponent;
  let fixture: ComponentFixture<LeftmenuitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftmenuitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftmenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
