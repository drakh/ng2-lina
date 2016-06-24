import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'lina-rules-screen',
  templateUrl: 'rules-screen.component.html',
  styleUrls: ['rules-screen.component.css']
})
export class RulesScreenComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onNavigate(destination: String) {
    console.log(`Rules navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }

}
