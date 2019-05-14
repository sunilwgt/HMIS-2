import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignPermissionHeaderButtonsComponent } from './assignpermissionheader-buttons.component';


describe('AssignPermissionHeaderButtonsComponent', () => {
  let component: AssignPermissionHeaderButtonsComponent;
  let fixture: ComponentFixture<AssignPermissionHeaderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPermissionHeaderButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPermissionHeaderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
