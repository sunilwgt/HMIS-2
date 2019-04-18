import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { hospitaltitleComponent } from './hospitaltitle.component';


describe('TitleComponent', () => {
  let component: hospitaltitleComponent;
  let fixture: ComponentFixture<hospitaltitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ hospitaltitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(hospitaltitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
