import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/";

declare var firebase: any;
declare var jQuery: any;

@Component({
  moduleId: module.id,
  templateUrl: 'intro-screen.component.html',
  styleUrls: ['intro-screen.component.css']
})
export class IntroScreenComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit():any {

    jQuery('body').addClass('empty').removeClass('squirrel');
    
    this.isLoggedIn = this._authService.isAuthenticated();
    if(!this.isLoggedIn) {
      this.onLogin();
    }
  }

  onLogin() {
    this._authService.signinUserFB().subscribe({
      complete: () => {
        this.isLoggedIn = this._authService.isAuthenticated();        
      },
      error: () => {}
    });
  }

  onNavigate(destination: String) {
    console.log(`Intro navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }

}
