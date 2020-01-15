import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { NoteComponent }   from './note/note.component';
import { QuestionComponent }   from './question/question.component';
import { SendToCustomerComponent }   from './send-to-customer/send-to-customer.component';
import { SendToCustomerDetailComponent }   from './send-to-customer-detail/send-to-customer-detail.component';
import { SendToCustomerMailComponent }   from './send-to-customer-mail/send-to-customer-mail.component';
import { RegisterComponent }   from './register/register.component';
import { ForgotPasswordComponent }   from './forgot-password/forgot-password.component';
import { LoginComponent }   from './login/login.component';
import { CustomerComponent }   from './customer/customer.component';
import { TestComponent }   from './test/test.component';
import { NewTestComponent }   from './new-test/new-test.component';
import { NewTesterComponent }   from './new-tester/new-tester.component';
import { TosComponent }   from './tos/tos.component';
import { RecordingComponent }   from './recording/recording.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'note', component: NoteComponent},
  {path:'question', component: QuestionComponent},
  {path:'sendToCustomer', component: SendToCustomerComponent},
  {path:'sendToCustomerDetail', component: SendToCustomerDetailComponent},
  {path:'sendToCustomerMail', component: SendToCustomerMailComponent},
  {path:'register', component: RegisterComponent},
  {path:'forgotPassword', component: ForgotPasswordComponent},
  {path:'login', component: LoginComponent},
  {path:'customer', component: CustomerComponent},
  {path:'test', component: TestComponent},
  {path:'newTest', component: NewTestComponent},
  {path:'newTester', component: NewTesterComponent},
  {path:'tos', component: TosComponent},
  {path:'recording', component: RecordingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
