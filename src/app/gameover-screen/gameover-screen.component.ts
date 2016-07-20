import { Component, OnInit } from '@angular/core';
import { ProgressService, User } from '../shared';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-gameover-screen',
  templateUrl: 'gameover-screen.component.html',
  styleUrls: ['gameover-screen.component.css']
})
export class GameoverScreenComponent implements OnInit {

  private isResultKnown: boolean;
  private isNewHighScore: boolean;

  private savedHighScore: number;
  private ingameHighScore: number;

  private ingameHighScoreString: string;
  private savedHighScoreString: string;

  private howFinished: string;

  // private debugText: string;
  // private debugMessages: Array<string>;

  constructor(
    private _progressService: ProgressService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
    // this.debugMessages = [];
    jQuery('body').addClass('empty').removeClass('squirrel');
  }

  // debugMessage(message: string, withoutAlert: boolean) {
  //   this.debugMessages.push(message);

  //   if(!withoutAlert) {
  //     alert(message);
  //   }
  // }

  ngOnInit() {

    this.howFinished = this._route.snapshot.params['howFinished'];
    this.isResultKnown = false;

    this.ingameHighScore = this._progressService.getIngameHighScore();
    // this.savedHighScore = this._progressService.getSavedHighscore();

    this._progressService.loggedUser$().subscribe({
      next: (user: User) => {
        if(!user || user.highScore === undefined) {
          return;
        }

        this.savedHighScore = user.highScore;
        this.checkIfNewHighScore();
        this.ingameHighScoreString = this.setScoreString(this.ingameHighScore);
        this.savedHighScoreString = this.setScoreString(this.savedHighScore);
      }
    });    
  }

  onNavigate(destination: String) {
    this.router.navigate([`/${destination}`]);
  }

  checkIfNewHighScore() {

    if(this.savedHighScore < this.ingameHighScore) {
      this.isNewHighScore = true;
      this._progressService.setQuestionProgress();
    }
    else {
      this.isNewHighScore = false;
    }

    this.isResultKnown = true;
  }

  setScoreString(scoreNumber: number): string {
    if( jQuery.inArray(scoreNumber, [2, 3, 4]) != -1 ) {
      return 'body';
    }
    else if(scoreNumber === 1) {
      return 'bod';
    }
    else {
      return 'bodov';
    }
  }

  isScoreDataAvailable() {
    return this.savedHighScore != undefined && this.ingameHighScore != undefined;
  }

}
