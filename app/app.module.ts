import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { StudentComponent } from '../students/student/student.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StudentFamilyComponent } from '../students/student-family/student-family.component';
import { PreviousEnrollmentComponent } from '../students/previous-enrollment/previous-enrollment.component';
import { AdmissionComponent } from '../students/admission/admission.component';
import { DocumentComponent } from '../students/document/document.component';
import { AddressComponent } from '../students/address/address.component';
import { StudentInfoComponent } from '../students/student-info/student-info.component';
import { FullComponent } from '../layouts/full/full.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { ErrorComponent } from '../error/error.component';
import { GlobalErrorHandler } from '../utilities/global-error-handler';
import { StudentGradeComponent } from '../students/student-grade/student-grade.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { FeeComponent } from '../fees/fee/fee.component';
import { FeeInfoComponent } from '../fees/fee-info/fee-info.component';
import { StudentEnquiryComponent } from '../students/student-enquiry/student-enquiry.component';
import { LoaderService } from '../services/loader.service';
import { LoaderInterceptorService } from '../services/loader-interceptor.service';
import { LoaderComponent } from '../loader/loader.component';
import { ViewFeeComponent } from '../fees/view-fee/view-fee.component';
import { GradeDetailsComponent } from '../reports/grade-details/grade-details.component';
import { MaterialTableComponent } from '../common/material-table/material-table.component';
import { AdmissionDetailsComponent } from '../reports/admission-details/admission-details.component';
import { FeeStructureComponent } from '../masters/fee-structure/fee-structure.component';
import { FeeDetailsComponent } from '../reports/fee-details/fee-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FeeDueComponent } from '../reports/fee-due/fee-due.component';
import { DailyExpenseComponent } from '../masters/daily-expense/daily-expense.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    StudentFamilyComponent,
    PreviousEnrollmentComponent,
    AdmissionComponent,
    DocumentComponent,
    AddressComponent,
    StudentInfoComponent,
    FullComponent,
    SidebarComponent,
    HeaderComponent,
    ErrorComponent,
    StudentGradeComponent,
    NotFoundComponent,
    FeeComponent,
    FeeInfoComponent,
    StudentEnquiryComponent,
    LoaderComponent,
    ViewFeeComponent,
    GradeDetailsComponent,
    MaterialTableComponent,
    AdmissionDetailsComponent,
    FeeStructureComponent,
    FeeDetailsComponent,
    DashboardComponent,
    FeeDueComponent,
    DailyExpenseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ 
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
