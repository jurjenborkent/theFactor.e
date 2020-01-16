import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenrecordComponent } from './screenrecord.component';

describe('ScreenrecordComponent', () => {
  let component: ScreenrecordComponent;
  let fixture: ComponentFixture<ScreenrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenrecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
