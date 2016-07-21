import { Injectable, EventEmitter } from "@angular/core";
import { DataService } from "./data.service";
import { User } from "./user.model";
import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from '../';

declare var firebase: any;

@Injectable()
export class AuthService {
  private database;
  public user: User;
  private userSubject: BehaviorSubject<User>;

  constructor(private _dataService: DataService) {
    this.database = firebase.database();
  }

  signinUserFB_2$(): BehaviorSubject<User> {

    this.userSubject = new BehaviorSubject<User>(this.user);
    const fbLoginProvider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(fbLoginProvider).then((result) => {

      this._dataService.user$(result.user.uid).subscribe({
        next: (user: User) => {

          this.user = user;

          if(!this.user) {
            console.log('There is no user! Creating one...');
            const newUser = new User(
              result.user.uid,
              result.user.displayName,
              result.user.email,
              result.user.photoURL,
              0
            );
            this._dataService.saveNewUser(newUser);
          }
          else {
            this.userSubject.next(<User>this.user);
          }
        }
      });

    })
    .catch(function(error) {});

    return this.userSubject;
  }

  isAuthenticated(): boolean {
    return this.user != undefined;
  }

  getLoggedUserDisplayName(): string {
    if( this.isAuthenticated() && this.user.getDisplayName() ) {
      return this.user.getDisplayName();
    }
    else {
      return '';
    }
  }

  setLoggedUserData(key: string, value: any): void {
    if(this.user[key] != undefined) {
      this.user[key] = value;
    }
  }

  getLoggedUserData(key: string): any {
    return this.user[key];
  }

  getLoggedUserDataAll$(): BehaviorSubject<any> {
    return this.userSubject;
  }

  getLoggedUserDataAll(): User {
    if( this.isAuthenticated() ) {
      return this.user;
    }
    else {
      return null;
    }
  }

  isAdmin(): boolean {
    const adminIdsArray: Array<String> = [];

    if(environment.production) {
      adminIdsArray.push(
        'nrOw1J2JH0cfSvMBOYANNFsjn902', // MH
        '89Q59uqjhWfkGMTLtjjqTqZA7K82', // BJ
        'qRXpAAKBOegcQQRmbjOCKpdz37g1' // MB
      );
    }
    else {
      adminIdsArray.push(
        'tkanysdviQSGU0NY3fPuofP0J0O2' // MB
      );
    }

    const loggedUserId: String = this.getLoggedUserData('uid');

    return adminIdsArray.indexOf(loggedUserId) !== -1;
  }
}
