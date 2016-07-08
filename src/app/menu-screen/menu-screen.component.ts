import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from "../shared/";

declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-menu-screen',
  templateUrl: 'menu-screen.component.html',
  styleUrls: ['menu-screen.component.css']
})
export class MenuScreenComponent implements OnInit {

  constructor(
    private _router: Router,
    private _progressService: ProgressService
  ) {}

  ngOnInit() {
    // console.log('MenuScreenComponent initialized');
    jQuery('body').addClass('empty').removeClass('squirrel');
    this._progressService.resetQuestionProgress();
  }

  onNavigate(destination: String) {
    // console.log(`Menu navigating to ${destination} screen.`);
    this._router.navigate([`/${destination}`]);
  }
}
