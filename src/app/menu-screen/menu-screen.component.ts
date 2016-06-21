import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-menu-screen',
  templateUrl: 'menu-screen.component.html',
  styleUrls: ['menu-screen.component.css']
})
export class MenuScreenComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onNavigate(destination: String) {
    console.log(`Menu navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }
}
