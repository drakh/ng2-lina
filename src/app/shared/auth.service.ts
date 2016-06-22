import {Injectable, EventEmitter} from "@angular/core";
import {User} from "./user.interface";
declare var firebase: any;

@Injectable()
export class AuthService {
  private _userLoggedOut = new EventEmitter<any>();

  signinUser(user: User) {
     firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
        .then(result => {
          result.getToken().then(
            token => localStorage.setItem('token', token)
          );
        })
        .catch(error => {
          if (error) {
            console.error(new Error(`${error.code}: ${error.message}`));
          }
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
    return localStorage.getItem('token') !== null;
  }

}
