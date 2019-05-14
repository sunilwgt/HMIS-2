import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignPermissionListComponent } from './assignpermission-list.component';


describe('AssignPermissionListComponent', () => {
  let component: AssignPermissionListComponent;
  let fixture: ComponentFixture<AssignPermissionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPermissionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPermissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
