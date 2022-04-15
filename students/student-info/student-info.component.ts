import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute) { }

  tabIndex: number = 0;
  studentId: number = 0;

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => { 
      this.studentId = +params.get('id')!;
    });
  }

  tabClick(tab: MatTabChangeEvent) {
    this.tabIndex = tab.index;
  }

}
