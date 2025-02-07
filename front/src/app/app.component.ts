import { Component, AfterViewInit, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front';

  // ngAfterViewInit(): void {
  //   if (typeof window !== 'undefined') {
  //     initFlowbite();
  //   }
  // }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
          initFlowbite();
      }
  }
}
