import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsertypeListComponent } from './usertype-list.component';


describe('UsertypeListComponent', () => {
  let component: UsertypeListComponent;
  let fixture: ComponentFixture<UsertypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
