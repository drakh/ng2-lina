import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../shared/";

declare var firebase: any;
declare var jQuery: any;

@Component({
  moduleId: module.id,
  templateUrl: 'intro-screen.component.html',
  styleUrls: ['intro-screen.component.css']
})
export class IntroScreenComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean;
  private changeDetectorInterval: any;

  private debugMessages: Array<string>;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.debugMessages = [];
  }

  ngOnInit():any {
    // this.debugMessage('IntroScreenComponent.ngOnInit', true);
    
    this.changeDetectorInterval = setInterval(() => {
      this._changeDetectorRef.detectChanges();
    }, 1000);

    jQuery('body').addClass('empty').removeClass('squirrel');
    
    this.isLoggedIn = this._authService.isAuthenticated();
    if(!this.isLoggedIn) {
      this.onLogin();
    }
  }

  ngOnDestroy() {
    clearInterval(this.changeDetectorInterval);
    this._changeDetectorRef = null;
  }

  onLogin() {
    // this.debugMessage('IntroScreenComponent.onLogin', true);

    this._authService.signinUserFB().subscribe({
      next: () => {
        // this.debugMessage('IntroScreenComponent.onLogin next()', true);
        this.isLoggedIn = this._authService.isAuthenticated();
        // this.debugMessage(`IntroScreenComponent.isLoggedIn: ${this.isLoggedIn}`, true);
      },
      error: (error) => console.error(new Error(error))
    });
  }

  debugMessage(message: string, withoutAlert: boolean) {
    this.debugMessages.push(message);
  }

  onNavigate(destination: String) {
    console.log(`Intro navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }

}
