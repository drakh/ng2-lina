import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { User } from "./user.model";
import { AuthService, DataService } from './';
import  'rxjs/Rx';

declare var _: any;
declare var firebase: any;

@Injectable()
export class ProgressService {
  private database;
  private questionProgress: number;
  private highScore: number;
  private userData: User;
  private allCodes: {};

  constructor (
    private _authService: AuthService,
    private _dataService: DataService
  ) {
    this.database = firebase.database();
    this.questionProgress = 0;
    this.userData = this._authService.getLoggedUserDataAll();

    this._dataService.allCodes$().subscribe({
      next: (allCodes) => this.allCodes = allCodes,
      error: (error) => console.error(error)
    });
  }

  increaseQuestionProgress() {
    this.questionProgress++;
  }

  resetQuestionProgress() {
    console.log('resetting actual question progress');
    this.questionProgress = 0;
  }

  getQuestionProgress(): number {
    return this.questionProgress;
  }

  validateCode(code: string) {

    if(!this.allCodes && code != '') {
      return true;
    }

    return code != '' && !_.contains(Object.keys(this.allCodes), code);
  }

  setQuestionProgress(code: string, date: string): boolean {

    const codeData = {
      uid: this.userData.uid,
      date: date
    };

    let usedCode = false;

    if(this.validateCode(code)) {
      this.userData.addCode(code);
      this.questionProgress += 5;
      usedCode = true;
    }

    if( this.userData.highScore < this.questionProgress ) {
      this.userData.setHighScore(this.questionProgress);
      this.database.ref(`users/${this.userData.uid}`).update(this.userData);

      if(usedCode) {
        this.database.ref(`codes/${code}`).set(codeData);
      }

      return true;
    }
    else {
      return false;
    }
  }

  getUserHighscore(): number {
    return this.userData.highScore;
  }
}
