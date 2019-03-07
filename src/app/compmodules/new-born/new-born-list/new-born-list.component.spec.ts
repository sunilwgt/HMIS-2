import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBornListComponent } from './new-born-list.component';

describe('NewBornListComponent', () => {
  let component: NewBornListComponent;
  let fixture: ComponentFixture<NewBornListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBornListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBornListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
