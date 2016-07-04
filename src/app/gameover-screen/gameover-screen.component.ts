import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from "@angular/common";
import { ProgressService } from '../shared';
import { Router, ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-gameover-screen',
  templateUrl: 'gameover-screen.component.html',
  styleUrls: ['gameover-screen.component.css']
})
export class GameoverScreenComponent implements OnInit {

  private isAddCodeFormVisible: boolean;
  private isResultKnown: boolean;
  private isNewHighScore: boolean;
  private codeHelped: boolean;
  private isCodeValid: boolean;

  private currentHighScore: number;
  private questionProgress: number;
  private currentProgressString: string;
  private highScoreString: string;

  private code: string;
  private date: string;

  private addCodeForm: ControlGroup;

  private howFinished: string;

  constructor(
    private _progressService: ProgressService,
    private router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    
  }

  ngOnInit() {
    jQuery('body').addClass('empty').removeClass('squirrel');


    this.howFinished = this._route.snapshot.params['howFinished'];
    console.log('GameoverScreenComponent.howFinished: ', this.howFinished);


    this.addCodeForm = this._fb.group({
      code: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.code = '';
    this.date = '';

    this.isCodeValid = true;
    this.isAddCodeFormVisible = true;
    this.isResultKnown = false;
    this.codeHelped = false;

    this.questionProgress = this._progressService.getQuestionProgress();
    this.currentHighScore = this._progressService.getUserHighscore();
    this.saveQuestionProgress();

    this.currentProgressString = this.setScoreString(this.questionProgress);
    this.highScoreString = this.setScoreString(this.currentHighScore);

    console.log('this.currentHighScore: ', this.currentHighScore);
    console.log('this.questionProgress: ', this.questionProgress);
  }

  onNavigate(destination: String) {
    console.log(`Rules navigating to ${destination} screen.`);
    this.router.navigate([`/${destination}`]);
  }

  saveQuestionProgress() {
    this.isNewHighScore = this._progressService.setQuestionProgress(this.code, this.date);
    this.isResultKnown = true;
    return this.isNewHighScore;
  }

  onAddCodeFormSubmit() {
    this.isCodeValid = true;
    if(this._progressService.validateCode(this.code)) {
      this.isAddCodeFormVisible = false;
      this.codeHelped = this.saveQuestionProgress();
      this.questionProgress = this._progressService.getQuestionProgress();
      this.currentHighScore = this._progressService.getUserHighscore();
      this.currentProgressString = this.setScoreString(this.questionProgress);
      this.highScoreString = this.setScoreString(this.currentHighScore);
    }
    else {
      this.isCodeValid = false;
    }
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

}
