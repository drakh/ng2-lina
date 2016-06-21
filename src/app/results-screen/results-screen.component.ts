import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-results-screen',
  templateUrl: 'results-screen.component.html',
  styleUrls: ['results-screen.component.css']
})
export class ResultsScreenComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onNavigate(destination: String) {
    console.log(`Results navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }

}
