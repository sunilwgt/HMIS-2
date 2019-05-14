import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  UserTypeHeaderButtonsComponent } from './usertypeheader-buttons.component';

describe('UserTypeHeaderButtonsComponent', () => {
  let component: UserTypeHeaderButtonsComponent;
  let fixture: ComponentFixture<UserTypeHeaderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTypeHeaderButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeHeaderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
