import { Injectable, EventEmitter } from "@angular/core";
import { DataService } from "./data.service";
import { User } from "./user.model";
import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";
declare var firebase: any;

@Injectable()
export class AuthService {
  private _userLoggedOut = new EventEmitter<any>();
  public user: User

  constructor(private _dataService: DataService) {}

  signinUserFB() {

    // const fbLoginProvider = new firebase.auth.FacebookAuthProvider();
    // firebase.auth().signInWithRedirect(fbLoginProvider);

    return new Observable(observer => {
      const fbLoginProvider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(fbLoginProvider).then((result) => {

        this._dataService.checkIfUserExist(result.user.uid).then((snapshot) => {
          if(snapshot.val()) {
            this.user = new User(
              snapshot.val().uid,
              snapshot.val().displayName,
              snapshot.val().email,
              snapshot.val().photoURL,
              snapshot.val().highScore,
              snapshot.val().codes || new Array()
            );
          }
          else {
            this.user = new User(
              result.user.uid,
              result.user.displayName,
              result.user.email,
              result.user.photoURL,
              0,
              new Array()
            );

            this._dataService.saveNewUser( this.getLoggedUserDataAll() );
          }

          observer.next(this.getLoggedUserDataAll());
        });
      })
      .catch(function(error) {
        observer.error(new Error(`${error.code}: ${error.message}`));
      });
    });
  }

  // getFacebookUserData(result) {
  //   this._dataService.checkIfUserExist(result.user.uid).then((snapshot) => {
  //     if(snapshot.val()) {
  //       this.user = new User(
  //         snapshot.val().uid,
  //         snapshot.val().displayName,
  //         snapshot.val().email,
  //         snapshot.val().photoURL,
  //         snapshot.val().highScore,
  //         snapshot.val().codes || new Array()
  //       );
  //     }
  //     else {
  //       this.user = new User(
  //         result.user.uid,
  //         result.user.displayName,
  //         result.user.email,
  //         result.user.photoURL,
  //         0,
  //         new Array()
  //       );

  //       this._dataService.saveNewUser( this.getLoggedUserDataAll() );
  //     }
  //   });
  // }

  logout() {
    localStorage.removeItem('token');
    this._userLoggedOut.emit(null);
  }

  getLoggedOutEvent(): EventEmitter<any> {
    return this._userLoggedOut;
  }

  isAuthenticated(): boolean {
    return this.user !== undefined;
  }

  getLoggedUserDisplayName(): string {
    if( this.isAuthenticated() && this.user.getDisplayName() ) {
      return this.user.getDisplayName();
    }
    else {
      return '';
    }
  }

  getLoggedUserData(key: string): string {
    return this.user[key];
  }

  getLoggedUserDataAll(): User {
    if( this.isAuthenticated() && this.user != null ) {
      return this.user;
    }
    else {
      return null;
    }
  }
}
