import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ControlGroup, Validators } from "@angular/common";
import { RADIO_GROUP_DIRECTIVES } from "ng2-radio-group";
import { DataService, ProgressService, Question } from '../shared/';
import { QuestionComponent } from '../question/';
import { Router } from '@angular/router';

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

  // @ViewChild(QuestionComponent)
  // private questionComponent: QuestionComponent;

  response: string;
  addQuestionForm: ControlGroup;
  correctAnswer: string;

  showQuestion: boolean;
  currentQuestionIndex: number;
  currentQuestion: Question;
  questionList: Array<Question>;

  private currentQuestionId: string;
  private currentQuestionText: string;
  private currentAnswer1Text: string;
  private currentAnswer2Text: string;
  private currentAnswer3Text: string;
  private currentAnswer4Text: string;

  private debugMessages: Array<string>;

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

    this.showQuestion = false;
    jQuery('body').addClass('squirrel').removeClass('empty');
  }

  ngAfterViewInit() {
    this.questionList = [];
    this.onGetQuestionList();
  }

  onAddQuestionFormSubmit() {
    const questionData: Question = this.addQuestionForm.value;
    questionData.timesFailed = 0;

    this._dataService.postQuestionData(questionData)
      .subscribe({
        next: questionId => this.onSaveCorrectAnswer(questionId),
        error: error => console.error(error),
        complete: () => this.clearQuestionForm()
      });
  }

  clearQuestionForm() {
    this.correctAnswer = null;

    _.each(this.addQuestionForm.controls, (control) => {
      control.updateValue('');
      control.setErrors(null);
    });
  }

  onSaveCorrectAnswer(questionId: string) {
    this._dataService.postCorrectAnswer(questionId, parseInt(this.correctAnswer))
      .subscribe({
        error: error => console.error(error)
      });
  }

  onAnswer(answeredResult: string) {

    // this.debugMessage(`onAnswer(${answeredResult})`);

    let timeOut = 1000;

    if(answeredResult === 'correct') {
      this._progressService.increaseQuestionProgress();
      setTimeout(() => {
        this.setNextQuestionData();
      }, timeOut);
    }
    else if(answeredResult === 'wrong') {      
      setTimeout(() => {
        this.onGameOver('wrong');
      }, timeOut);
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

    // this.debugMessage('downloading question data...');

    this._dataService.getAllQuestionsData()
      .subscribe({
        next: (question) => {
          question[1].id = question[0];
          this.questionList.push(question[1]);
          // this.debugMessage(`downloaded question ${question[0]}`);
        },
        complete: () => {
          // this.questionList = [
          //   this.questionList[0],
          //   this.questionList[1],
          //   this.questionList[2]
          // ];
          // this.debugMessage('downloaded question data!');
          this.setNextQuestionData();
        }
      });
  }

  setNextQuestionData() {

    if(this.questionList.length < 1) {
      this.onGameOver('win');
    }

    const questionIndex = Math.floor(Math.random() * this.questionList.length);
    this.currentQuestion = this.questionList.splice(questionIndex, 1)[0];

    this.currentQuestionId = this.currentQuestion.id;
    this.currentQuestionText = this.currentQuestion.question;
    this.currentAnswer1Text = this.currentQuestion.answer1;
    this.currentAnswer2Text = this.currentQuestion.answer2;
    this.currentAnswer3Text = this.currentQuestion.answer3;
    this.currentAnswer4Text = this.currentQuestion.answer4;

    // alert(`setting current question: ${this.currentQuestionText}`);

    // removes random question from questionList and saves it
    // if(this.showQuestion) {
    //   this.questionComponent.changeQuestion(this.currentQuestion);
    // }
    
  }

  debugMessage(message: string) {
    this.debugMessages.push(message);
  }

}
