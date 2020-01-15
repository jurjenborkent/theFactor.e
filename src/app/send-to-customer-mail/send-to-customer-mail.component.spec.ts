import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendToCustomerMailComponent } from './send-to-customer-mail.component';

describe('SendToCustomerMailComponent', () => {
  let component: SendToCustomerMailComponent;
  let fixture: ComponentFixture<SendToCustomerMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToCustomerMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToCustomerMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
