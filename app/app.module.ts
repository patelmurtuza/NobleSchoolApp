import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { StudentComponent } from '../students/student/student.component';
import { HttpClientModule } from '@angular/common/http';
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
    FeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ {provide: ErrorHandler, useClass: GlobalErrorHandler} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
