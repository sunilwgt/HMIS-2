import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardProgressComponent } from './ward-progress.component';

describe('WardProgressComponent', () => {
  let component: WardProgressComponent;
  let fixture: ComponentFixture<WardProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
