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

  @ViewChild(QuestionComponent)
  private questionComponent: QuestionComponent;

  response: string;
  addQuestionForm: ControlGroup;
  correctAnswer: string;

  showQuestion: boolean;
  currentQuestionIndex: number;
  currentQuestion: Question;
  questionList: Array<Question>;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _dataService: DataService,
    private _progressService: ProgressService
  ) {}

  ngOnInit() {
    this.addQuestionForm = this._fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required]
    });

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
    // if(howFinished === 'wrong') {
    //   this._dataService.postQuestionFail(this.currentQuestion)
    //     .subscribe({
    //       error: error => console.error(error)
    //     });
    // }

    this._router.navigate(['/gameover', howFinished]);
  }

  onGetQuestionList() {
    this._dataService.getAllQuestionsData()
      .subscribe({
        next: (question) => {
          question[1].id = question[0];
          this.questionList.push(question[1]);
        },
        complete: () => {
          // this.questionList = [
          //   this.questionList[0],
          //   this.questionList[1],
          //   this.questionList[2]
          // ];
          this.setNextQuestionData();
        }
      });
  }

  setNextQuestionData() {

    if(this.questionList.length < 1) {
      this.onGameOver('win');
    }

    const questionIndex = Math.floor(Math.random() * this.questionList.length);
    // this.currentQuestion = null;
    this.currentQuestion = this.questionList.splice(questionIndex, 1)[0];

    // removes random question from questionList and saves it
    this.questionComponent.changeQuestion(this.currentQuestion);
  }

  onTimeRunOut() {

  }

}
