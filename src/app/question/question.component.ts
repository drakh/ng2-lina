import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DataService, Question } from '../shared/';
import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'lina-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Output() onTimeRunOut = new EventEmitter();
  @Output() onAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();

  questionTimerSubscription: any;
  remainingTime: number;
  lastClickedButton;
  questionTimer$;

  constructor(
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.onInitTimer();
  }

  onCheckAnswer($event) {

    this.lastClickedButton = $event.target;

    let answer = this.lastClickedButton.dataset.answer;
    let actualClassName = this.lastClickedButton.className;
    this.lastClickedButton.className = `loading`;

    this._dataService.checkAnswer(this.question.id, answer)
    .subscribe({
      next: (result) => {
        this.questionTimerSubscription.unsubscribe();
        result = result ? 'correct' : 'wrong';
        this.lastClickedButton.className = result;

        setTimeout(() => {
          this.onAnswer.emit(result);
        }, 1500);
      }
    });
  }

  onInitTimer() {

    this.remainingTime = 10;
    this.questionTimer$ = Observable.interval(1000);
    this.questionTimerSubscription = this.questionTimer$.take(10).subscribe({
      next: () => {
        --this.remainingTime;
      },
      complete: () => {
        this.onTimeRunOut.emit('');
      }
    });
  }

  changeQuestion(question: Question) {
    if(this.lastClickedButton) {
      this.lastClickedButton.className = '';
    }
    
    this.questionTimerSubscription.unsubscribe();
    this.question = question;
    this.onInitTimer();
  }

}
