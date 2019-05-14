import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignPermissionComponent } from './assignpermission.component';


describe('AssignPermissionComponent', () => {
  let component: AssignPermissionComponent;
  let fixture: ComponentFixture<AssignPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
