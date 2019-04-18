import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocrepoComponent } from './docrepo.component';

describe('DocrepoComponent', () => {
  let component: DocrepoComponent;
  let fixture: ComponentFixture<DocrepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocrepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocrepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
