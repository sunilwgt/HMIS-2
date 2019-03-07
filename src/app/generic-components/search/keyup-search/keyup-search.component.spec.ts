import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyupSearchComponent } from './keyup-search.component';

describe('KeyupSearchComponent', () => {
  let component: KeyupSearchComponent;
  let fixture: ComponentFixture<KeyupSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyupSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
