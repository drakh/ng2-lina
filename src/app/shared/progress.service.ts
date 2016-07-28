import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { User } from "./user.model";
import { AuthService, DataService } from './';
import  'rxjs/Rx';

declare var _: any;
declare var firebase: any;

@Injectable()
export class ProgressService {
  private database;
  private ingameHighScore: number;
  private highScore: number;
  private user: User;
  private allCodes: {};

  constructor (
    private _authService: AuthService
  ) {
    this.database = firebase.database();
    this.ingameHighScore = 0;
    this.user = this._authService.getLoggedUserDataAll();
  }

  increaseIngameHighScore() {
    this.ingameHighScore++;
  }

  resetIngameHighScore() {
    this.ingameHighScore = 0;
  }

  getIngameHighScore(): number {
    return this.ingameHighScore;
  }

  getSavedHighscore(): number {
    return this._authService.getLoggedUserData('highScore');
  }

  loggedUser$(): BehaviorSubject<User> {
    const userSubject: BehaviorSubject<User> = this._authService.getLoggedUserDataAll$();
    return userSubject;
  }

  setQuestionProgress(): void {
    this._authService.setLoggedUserData('highScore', this.ingameHighScore);

    this.database
      .ref(`users/${this.user.uid}`)
        .update(this._authService.getLoggedUserDataAll());
  }
}
