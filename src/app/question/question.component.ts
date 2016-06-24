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
  @Output() onTimeRunOut = new EventEmitter<boolean>();
  @Output() onAnswer = new EventEmitter<boolean>();
  remainingTime: number;
  questionTimer$: Observable<any>;
  questionTimerSubsciption: any;

  constructor(
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.onInitTimer();
  }

  onCheckAnswer(answer: number) {
    this._dataService.checkAnswer(this.question.id, answer)
    .subscribe({
      next: (result) => {
        this.onAnswer.emit(result);
        this.questionTimerSubsciption.unsubscribe();
      },
      complete: () => console.log('checkAnswer complete.')
    });
  }

  onInitTimer() {
    this.remainingTime = 10;
    this.questionTimer$ = Observable.interval(1000);
    this.questionTimerSubsciption = this.questionTimer$.take(10).subscribe({
      next: () => {
        --this.remainingTime;
      },
      complete: () => {
        return this._router.navigate([`/`]);
      }
    });
  }

}
