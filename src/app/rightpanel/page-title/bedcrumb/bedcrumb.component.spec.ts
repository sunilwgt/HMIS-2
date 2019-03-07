import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedcrumbComponent } from './bedcrumb.component';

describe('BedcrumbComponent', () => {
  let component: BedcrumbComponent;
  let fixture: ComponentFixture<BedcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
