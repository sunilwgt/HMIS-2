import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHeaderButtonsComponent } from './userheader-buttons.component';


describe('UserHeaderButtonsComponent', () => {
  let component: UserHeaderButtonsComponent;
  let fixture: ComponentFixture<UserHeaderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHeaderButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHeaderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
