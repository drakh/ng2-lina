import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ProgressService } from "../shared/";

declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-menu-screen',
  templateUrl: 'menu-screen.component.html',
  styleUrls: ['menu-screen.component.css']
})
export class MenuScreenComponent implements OnInit {

  private isAdmin: boolean;

  constructor(
    private _router: Router,
    private _progressService: ProgressService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    jQuery('body').addClass('empty').removeClass('squirrel');
    this._progressService.resetQuestionProgress();
    this.isAdmin = this._authService.isAdmin();
  }

  onNavigate(destination: String) {
    this._router.navigate([`/${destination}`]);
  }
}
