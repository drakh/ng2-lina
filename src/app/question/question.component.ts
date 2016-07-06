import { Component, OnInit, OnChanges, DoCheck, EventEmitter, Input, Output } from '@angular/core';
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
export class QuestionComponent implements OnInit, OnChanges {

  @Input() id: string;
  @Input() answer1: string;
  @Input() answer2: string;
  @Input() answer3: string;
  @Input() answer4: string;
  @Input() question: string;

  @Output() onTimeRunOut = new EventEmitter();
  @Output() onAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();

  questionTimerSubscription: any;
  remainingTime: number;
  lastClickedButton;
  questionTimer$;
  canAnswer: boolean;

  constructor(
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.canAnswer = true;
    // alert('QuestionComponent.ngOnInit');
    // this.initTimer();
  }

  ngOnChanges() {
    // alert('QuestionComponent.ngOnChanges');
    if(this.question) {
      this.changeQuestion();
    }
  }

  // ngDoCheck() {
  //   alert('QuestionComponent.ngDoCheck');
  // }

  // ngAfterContentInit() {
  //   alert('QuestionComponent.ngAfterContentInit');
  // }

  // ngAfterContentChecked() {
  //   alert('QuestionComponent.ngAfterContentChecked');
  // }

  // ngAfterViewInit() {
  //   alert('QuestionComponent.ngAfterViewInit');
  // }

  // ngAfterViewChecked() {
  //   alert('QuestionComponent.ngAfterViewChecked');
  // }

  onCheckAnswer($event) {
    if(!this.canAnswer) {
      return;
    }

    this.canAnswer = false;

    this.lastClickedButton = $event.target;

    let answer = this.lastClickedButton.dataset.answer;
    let actualClassName = this.lastClickedButton.className;
    this.lastClickedButton.className = `loading`;

    this._dataService.checkAnswer(this.id, answer)
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
          this.onAnswer.emit(result);
        }, 2000);
      },
      error: (error) => {
        console.error(new Error(error));
      }
    });
  }

  initTimer() {

    this.remainingTime = 20;
    this.questionTimer$ = Observable.interval(1000);
    this.questionTimerSubscription = this.questionTimer$.take(20).subscribe({
      next: () => {
        --this.remainingTime;
      },
      complete: () => {
        this.onTimeRunOut.emit('');
      }
    });
  }

  changeQuestion(/*question: Question*/) {
    if(this.lastClickedButton) {
      this.lastClickedButton.className = '';
    }
    
    if(this.questionTimerSubscription) {
      this.questionTimerSubscription.unsubscribe();
    }

    // this.question = question;

    // alert(this.question);

    this.canAnswer = true;
    this.initTimer();
  }

}
