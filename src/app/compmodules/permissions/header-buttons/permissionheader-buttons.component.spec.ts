import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PermissionHeaderButtonsComponent } from './permissionheader-buttons.component';


describe('PermissionHeaderButtonsComponent', () => {
  let component: PermissionHeaderButtonsComponent;
  let fixture: ComponentFixture<PermissionHeaderButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionHeaderButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionHeaderButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
