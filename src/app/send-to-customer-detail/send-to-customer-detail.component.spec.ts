import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToCustomerDetailComponent } from './send-to-customer-detail.component';

describe('SendToCustomerDetailComponent', () => {
  let component: SendToCustomerDetailComponent;
  let fixture: ComponentFixture<SendToCustomerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToCustomerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
