import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-prizes-screen',
  templateUrl: 'prizes-screen.component.html',
  styleUrls: ['prizes-screen.component.css']
})
export class PrizesScreenComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    jQuery('body').addClass('empty').removeClass('squirrel');
  }

  onNavigate(destination: String) {
    console.log(`Prizes navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }

}
