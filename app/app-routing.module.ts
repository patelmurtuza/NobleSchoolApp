import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentEnquiryComponent } from '../students/student-enquiry/student-enquiry.component';
import { StudentInfoComponent } from '../students/student-info/student-info.component';
import { FullComponent } from '../layouts/full/full.component';
import { ErrorComponent } from '../error/error.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StudentGradeComponent } from '../students/student-grade/student-grade.component';
import { FeeComponent } from '../fees/fee/fee.component';
import { FeeInfoComponent } from '../fees/fee-info/fee-info.component';
import { GradeDetailsComponent } from '../reports/grade-details/grade-details.component';
import { AdmissionDetailsComponent } from '../reports/admission-details/admission-details.component';
import { FeeStructureComponent } from '../masters/fee-structure/fee-structure.component';
import { FeeDetailsComponent } from '../reports/fee-details/fee-details.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FeeDueComponent } from '../reports/fee-due/fee-due.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: FullComponent, 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'student-info', component: StudentInfoComponent },
      { path: 'student', component: StudentEnquiryComponent },
      { path: 'student/:id', component: StudentEnquiryComponent },
      { path: 'student-grade', component: StudentGradeComponent },
      { path: 'fee-info', component: FeeInfoComponent },
      { path: 'fee/:id', component: FeeComponent },
      { path: 'grade-details', component: GradeDetailsComponent },
      { path: 'admission-details', component: AdmissionDetailsComponent },
      { path: 'fee-details', component: FeeDetailsComponent },
      { path: 'fee-due', component: FeeDueComponent },
      { path: 'fee-structure', component: FeeStructureComponent },
      { path: 'error', component: ErrorComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: '**', redirectTo: 'not-found' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
