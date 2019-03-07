import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcaptureComponent } from './imgcapture.component';

describe('ImgcaptureComponent', () => {
  let component: ImgcaptureComponent;
  let fixture: ComponentFixture<ImgcaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgcaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgcaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
