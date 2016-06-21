import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'intro-screen.component.html',
  styleUrls: ['intro-screen.component.css']
})
export class IntroScreenComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onNavigate(destination: String) {
    console.log(`Intro navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }

}
