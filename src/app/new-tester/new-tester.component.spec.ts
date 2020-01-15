import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTesterComponent } from './new-tester.component';

describe('NewTesterComponent', () => {
  let component: NewTesterComponent;
  let fixture: ComponentFixture<NewTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
