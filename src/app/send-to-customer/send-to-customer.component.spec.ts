import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToCustomerComponent } from './send-to-customer.component';

describe('SendToCustomerComponent', () => {
  let component: SendToCustomerComponent;
  let fixture: ComponentFixture<SendToCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
