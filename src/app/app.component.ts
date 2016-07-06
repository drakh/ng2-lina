import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from "./shared/";

declare var firebase: any;

@Component({
  moduleId: module.id,
  selector: 'lina-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent  {
  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit() {
    // firebase.auth().getRedirectResult().then(function(result) {

    //   console.log('firebase.auth');

    //   if (result.credential) {
    //     this._authService.getFacebookUserData(result);
    //   }

    //   var user = result.user;
    // }).catch(function(error) {
    //   console.error(error);
    // });
  }
}
