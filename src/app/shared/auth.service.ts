import { Injectable, EventEmitter } from "@angular/core";
import { DataService } from "./data.service";
import { User } from "./user.model";
import  'rxjs/Rx';
import {Observable} from "rxjs/Observable";
declare var firebase: any;

@Injectable()
export class AuthService {
  private _userLoggedOut = new EventEmitter<any>();
  private user: User

  constructor(private _dataService: DataService) {}

  signinUserFB() {
    return new Observable(observer => {
      const fbLoginProvider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(fbLoginProvider).then((result) => {
        localStorage.setItem('token', result.credential.accessToken);

        this.user = new User(
          result.user.uid,
          result.user.displayName,
          result.user.email,
          result.user.photoURL
        );

        observer.next();

      })
      .catch(function(error) {
        observer.error(new Error(`${error.code}: ${error.message}`));
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this._userLoggedOut.emit(null);
  }

  getLoggedOutEvent(): EventEmitter<any> {
    return this._userLoggedOut;
  }

  isAuthenticated(): boolean {
    return (localStorage.getItem('token') !== null && this.user !== undefined);
  }

  getLoggedUserDisplayName(): string {
    console.log(this.user);
    if( this.isAuthenticated() && this.user.getDisplayName() ) {
      return this.user.getDisplayName();
    }
    else {
      return '';
    }
  }

}
