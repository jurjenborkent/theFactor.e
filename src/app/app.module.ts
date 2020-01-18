import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent }   from './header/header.component';
import { NavigationComponent }   from './navigation/navigation.component';

import { HomeComponent } from './home/home.component';
import { NoteComponent } from './note/note.component';
import { QuestionComponent } from './question/question.component';
import { SendToCustomerComponent } from './send-to-customer/send-to-customer.component';
import { SendToCustomerDetailComponent } from './send-to-customer-detail/send-to-customer-detail.component';
import { SendToCustomerMailComponent } from './send-to-customer-mail/send-to-customer-mail.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { CustomerComponent } from './customer/customer.component';
import { TestComponent } from './test/test.component';
import { NewTestComponent } from './new-test/new-test.component';
import { NewTesterComponent } from './new-tester/new-tester.component';
import { TosComponent } from './tos/tos.component';
import { RecordingComponent } from './recording/recording.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NoteComponent,
    QuestionComponent,
    SendToCustomerComponent,
    SendToCustomerDetailComponent,
    SendToCustomerMailComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    LoginComponent,
    CustomerComponent,
    TestComponent,
    NewTestComponent,
    NewTesterComponent,
    TosComponent,
    RecordingComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    NavigationComponent
  ]
})
export class AppModule { }
