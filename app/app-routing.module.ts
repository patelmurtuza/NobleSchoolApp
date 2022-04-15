import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from '../students/student/student.component';
import { StudentInfoComponent } from '../students/student-info/student-info.component';
import { FullComponent } from '../layouts/full/full.component';
import { ErrorComponent } from '../error/error.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StudentGradeComponent } from '../students/student-grade/student-grade.component';
import { FeeComponent } from '../fees/fee/fee.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: FullComponent, 
    children: [
      { path: 'student', component: StudentComponent },
      { path: 'student-info/:id', component: StudentInfoComponent },
      { path: 'student-grade', component: StudentGradeComponent },
      { path: 'fee/:id', component: FeeComponent },
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
