import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  getBank(): string[] {
    return [ 'Axis Bank Ltd', 'Bandhan Bank Ltd', 'HDFC Bank Ltd', 'ICICI Bank Ltd', 'YES Bank Ltd', 'IDBI Bank Limited', 'State Bank of India', '	Union Bank of India' ];
  }

  getState(): string[] {
    return [ 'Maharashtra' ];
  }

  getCity(): string[] {
    return [ 'Mumbai', 'Navi Mumbai' ];
  }

  getGrade(): string[] {
    return [ 'Nursery', 'Jr. KG', 'Sr. KG', 'Std I', 'Std II', 'Std III' ];
  }

  getStudentDocument(): string[] {
    return [ 'Birth Certificate', "Child's Aadhaar Card", 'Leaving Certificate', "Parent's Aadhaar Card", 'Passport Photograph', 'Previous Marksheet', 'Undertaking' ];
  }

  getReligion(): string[] {
    return [ 'Christian', 'Hindu', 'Muslim' ];
  }

  getCaste(): string[] {
    return [ 'General' ];
  }

  getAcademicYear(): string[] {
    let year: string[] = [];
    const current = new Date().getFullYear();
    for (let i = 2022; i <= current; i++) {
      year.push(`${i} - ${i+1}`);
    }
    return year;
  }

}
