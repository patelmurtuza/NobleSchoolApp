import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-student-enquiry',
  templateUrl: './student-enquiry.component.html',
  styleUrls: ['./student-enquiry.component.scss']
})
export class StudentEnquiryComponent implements OnInit {

  constructor() { }

  tabIndex: number = 0;

  ngOnInit(): void {
  }

  tabClick(tab: MatTabChangeEvent) {
    this.tabIndex = tab.index;
  }

}
