import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit, OnDestroy, AfterViewInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change", () => {
      this._mobileQueryListener;
    });
  }

  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("change", () => {
      this._mobileQueryListener;
    });
  }

  ngOnInit(): void {
  }

}
