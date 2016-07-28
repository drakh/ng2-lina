import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from "@angular/common";
import { RADIO_GROUP_DIRECTIVES } from "ng2-radio-group";
import { DataService, ProgressService, Question, Answer } from '../shared/';
import { AnswerComponent } from './answer';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { environment } from '../';

import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";

declare var _: any;
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-questions-screen',
  templateUrl: 'questions-screen.component.html',
  styleUrls: ['questions-screen.component.css'],
  directives: [RADIO_GROUP_DIRECTIVES, AnswerComponent]
})
export class QuestionsScreenComponent implements OnInit, OnDestroy {

  addQuestionForm: ControlGroup;
  correctAnswer: string;

  currentQuestion: Question;
  questionList: Array<Question>;

  private debugMessages: Array<string>;

  private questionTimerSubscription: any;
  private remainingTime: number;
  private lastClickedButton;
  private questionTimer$;
  private canAnswer: boolean;

  private questionVisible: boolean;

  private changeDetected: boolean;

  private changeDetectorInterval: any;
  private answersOrder: Array<number>;
  private answers: Array<Answer>;

  private timerInSeconds: number;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _dataService: DataService,
    private _progressService: ProgressService
  ) {
    this.debugMessages = [];
    this.timerInSeconds = environment.production ? 20 : 60;
  }

  ngOnInit() {

    this.questionVisible = false;
    this.canAnswer = true;
    jQuery('body').addClass('squirrel').removeClass('empty');

    this.questionList = [];
    this.onGetQuestionList();
  }

  ngOnDestroy() {
    if(this.questionTimerSubscription) {
      this.questionTimerSubscription.unsubscribe();
    }
  }

  onGameOver(howFinished: string) {
    if(howFinished === 'wrong') {
      this._dataService.postQuestionFail(this.currentQuestion)
        .subscribe({
          error: error => console.error(error)
        });
    }

    this._router.navigate(['/gameover', howFinished]);
  }

  onGetQuestionList() {
    this._dataService.allQuestionsData$()
      .subscribe({
        next: (allQuestionsData) => {
          this.questionList = allQuestionsData;
        },
        complete: () => {
          this.prepareQuestionData();
          this.setNextQuestionData();
        }
      });
  }

  prepareQuestionData() {
    this.questionList = _.map(this.questionList, (questionData, questionKey) => {
      questionData.id = questionKey;
      return questionData;
    });
  }

  onSelectAnswer(clickedButton) {
    if(!this.canAnswer) {
      return;
    }

    this.canAnswer = false;

    this.lastClickedButton = clickedButton;

    let answer = this.lastClickedButton.dataset.answer;
    let actualClassName = this.lastClickedButton.className;
    this.lastClickedButton.className = `loading`;

    this._dataService.checkAnswer(this.currentQuestion.id, answer)
    .subscribe({
      next: (result) => {

        if(this.questionTimerSubscription) {
          this.questionTimerSubscription.unsubscribe();
        }
        
        result = result ? 'correct' : 'wrong';

        setTimeout(() => {
          this.lastClickedButton.className = result;
        }, 1000);

        setTimeout(() => {
          this.onAnswer(result);
        }, 2000);
      },
      error: (error) => {
        console.error(new Error(error));
      }
    });
  }

  onAnswer(answeredResult: string) {
    let timeOut = 1000;    

    if(answeredResult === 'correct') {
      this._progressService.increaseIngameHighScore();
      setTimeout(() => {
        this.resetClickedButton();        
        this.setNextQuestionData();
      }, timeOut);
    }
    else if(answeredResult === 'wrong') {      
      setTimeout(() => {
        this.resetClickedButton();
        this.onGameOver('wrong');
      }, timeOut);
    }
  }

  resetClickedButton() {
    if(this.lastClickedButton) {
      this.lastClickedButton.className = '';
    }
  }

  setAnswers() {
    const answersOrder: Array<number> = _.shuffle([1, 2, 3, 4]);
    this.answers = _.map(answersOrder, (num) => {
      return new Answer(num, this.currentQuestion[`answer${num}`]);
    });
  }

  setNextQuestionData() {
    if(this.questionList.length < 1) {
      this.onGameOver('win');
    }

    this.questionVisible = false;

    const questionIndex = Math.floor(Math.random() * this.questionList.length);

    this.currentQuestion = this.questionList.splice(questionIndex, 1)[0];
    this.setAnswers();

    if(this.questionTimerSubscription) {
      this.questionTimerSubscription.unsubscribe();
    }

    this.questionVisible = true;
    this.canAnswer = true;
    this.initTimer();
  }

  initTimer() {

    this.remainingTime = this.timerInSeconds;
    this.questionTimer$ = Observable.interval(1000);
    this.questionTimerSubscription = this.questionTimer$.take(this.timerInSeconds).subscribe({
      next: () => {
        --this.remainingTime;
      },
      complete: () => {
        this.onGameOver('timeup');
      }
    });
  }

  debugMessage(message: string, withoutAlert: boolean) {
    this.debugMessages.push(message);

    if(!withoutAlert) {
      alert(message);
    }
  }

}
