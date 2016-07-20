import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from "@angular/common";
import { RADIO_GROUP_DIRECTIVES } from "ng2-radio-group";
import { DataService, ProgressService, Question } from '../shared/';
import { QuestionComponent } from '../question/';
import { Router } from '@angular/router';

import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";

declare var _: any;
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-questions-screen',
  templateUrl: 'questions-screen.component.html',
  styleUrls: ['questions-screen.component.css'],
  directives: [RADIO_GROUP_DIRECTIVES, QuestionComponent]
})
export class QuestionsScreenComponent implements OnInit {

  addQuestionForm: ControlGroup;
  correctAnswer: string;

  currentQuestion: Question;
  questionList: Array<Question>;

  private currentQuestionId: string;
  private currentQuestionText: string;
  private currentAnswer1Text: string;
  private currentAnswer2Text: string;
  private currentAnswer3Text: string;
  private currentAnswer4Text: string;

  private debugMessages: Array<string>;

  private questionTimerSubscription: any;
  private remainingTime: number;
  private lastClickedButton;
  private questionTimer$;
  private canAnswer: boolean;

  private questionVisible: boolean;

  private changeDetected: boolean;

  private changeDetectorInterval: any;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _dataService: DataService,
    private _progressService: ProgressService
  ) {
    this.debugMessages = [];
  }

  ngOnInit() {
    // this.addQuestionForm = this._fb.group({
    //   question: ['', Validators.required],
    //   answer1: ['', Validators.required],
    //   answer2: ['', Validators.required],
    //   answer3: ['', Validators.required],
    //   answer4: ['', Validators.required]
    // });

    this.questionVisible = false;
    this.canAnswer = true;
    jQuery('body').addClass('squirrel').removeClass('empty');

    this.questionList = [];
    this.onGetQuestionList();
  }

  // onAddQuestionFormSubmit() {
  //   const questionData: Question = this.addQuestionForm.value;
  //   questionData.timesFailed = 0;

  //   this._dataService.postQuestionData(questionData)
  //     .subscribe({
  //       next: questionId => this.onSaveCorrectAnswer(questionId),
  //       error: error => console.error(error),
  //       complete: () => this.clearQuestionForm()
  //     });
  // }

  // clearQuestionForm() {
  //   this.correctAnswer = null;

  //   _.each(this.addQuestionForm.controls, (control) => {
  //     control.updateValue('');
  //     control.setErrors(null);
  //   });
  // }

  // onSaveCorrectAnswer(questionId: string) {
  //   this._dataService.postCorrectAnswer(questionId, parseInt(this.correctAnswer))
  //     .subscribe({
  //       error: error => console.error(error)
  //     });
  // }



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

  onCheckAnswer($event) {
    if(!this.canAnswer) {
      return;
    }

    this.canAnswer = false;

    this.lastClickedButton = $event.target;

    let answer = this.lastClickedButton.dataset.answer;
    let actualClassName = this.lastClickedButton.className;
    this.lastClickedButton.className = `loading`;

    this._dataService.checkAnswer(this.currentQuestionId, answer)
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

  setNextQuestionData() {
    if(this.questionList.length < 1) {
      this.onGameOver('win');
    }

    this.questionVisible = false;

    const questionIndex = Math.floor(Math.random() * this.questionList.length);
    this.currentQuestion = this.questionList.splice(questionIndex, 1)[0];    

    this.currentQuestionId = this.currentQuestion.id;
    this.currentQuestionText = this.currentQuestion.question;
    this.currentAnswer1Text = this.currentQuestion.answer1;
    this.currentAnswer2Text = this.currentQuestion.answer2;
    this.currentAnswer3Text = this.currentQuestion.answer3;
    this.currentAnswer4Text = this.currentQuestion.answer4;

    if(this.questionTimerSubscription) {
      this.questionTimerSubscription.unsubscribe();
    }

    this.questionVisible = true;
    this.canAnswer = true;
    this.initTimer();
  }

  initTimer() {

    this.remainingTime = 20;
    this.questionTimer$ = Observable.interval(1000);
    this.questionTimerSubscription = this.questionTimer$.take(20).subscribe({
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
