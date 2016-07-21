import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, User, Question } from '../shared/';
import { Response } from '@angular/http';
import { QuestionDetailComponent } from './question/question-detail/'
import { QuestionRowComponent } from './question/question-row/'

import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";

declare var _: any;
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'lina-admin-screen',
  templateUrl: 'admin-screen.component.html',
  styleUrls: ['admin-screen.component.css'],
  directives: [QuestionRowComponent, QuestionDetailComponent]
})
export class AdminScreenComponent implements OnInit {

  private users: Array<User>;
  private selectedUser: User;
  private topScoreUsers: Array<User>;
  private topScore: number;
  private drawResult: number;
  private randomNumbers: Array<number>;

  private answers: Array<number>;
  private questions: Array<Question>;
  private selectedQuestion: Question;

  @ViewChild(QuestionDetailComponent) questonDetail: QuestionDetailComponent;

  constructor(
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.initUsers();
    this.initQuestions();
    this.initAnswers();

    jQuery('#admin-tabs a').click(function (e) {
      e.preventDefault()
      jQuery(this).tab('show');
    })
  }

  onNavigate(destination: String) {
    this._router.navigate([`/${destination}`]);
  }

  /** 
  * Sorts users list and populate new user list filtered by topScore
  */
  handleUsers(allUsers: Array<User>) {
    this.users = [];
    _.each(allUsers, (userData: User) => {
      this.users.push(<User>userData);
    });
    this.users = _.sortBy(this.users, 'highScore').reverse();
    this.topScore = this.users[0].highScore;
    this.users = _.sortBy(this.users, 'displayName');
    this.topScoreUsers = this.users.filter(userData => userData.highScore === this.topScore);
  }

  onDraw() {
    if(this.topScoreUsers.length > 1) {
      this._dataService.randomNumber$(this.topScoreUsers.length-1).subscribe({
        next: (response: Response) => {
          if(response.json().result) {
            this.drawResult = <number>response.json().result.random.data[0];
            console.log(`Picked random number between 0 and ${this.topScoreUsers.length-1}: ${this.drawResult}.`);
          }        
        }
      });
    }
    else {
      this.drawResult = 0;
    }
  }

  initUsers() {
    this._dataService.allUsers$()
      .subscribe({
        next: (allUsers: Array<User>) => {
          this.handleUsers(allUsers);
        },
        error: error => console.error(error),
      });
  }

  initQuestions() {
    this._dataService.allQuestions$()
      .subscribe({
        next: (allQuestions: Array<Question>) => {
          _.map(allQuestions, (questionData, id) => {
            questionData.id = id;
            allQuestions[id] = questionData;
          });
          this.questions = _.sortBy(allQuestions, 'timesFailed').reverse();
        },
        error: error => console.error(error),
      });
  }

  initAnswers() {
    this._dataService.allAnswers$()
      .subscribe({
        next: (allAnswers) => {
          this.answers = allAnswers;
        },
        error: error => console.error(error),
      });
  }

  onUserSelect(event) {
    this.selectedUser = _.find(this.users, (user: User) => user.uid == event.target.dataset.uid);
  }

  onQuestionSelect(questionId) {
    this.selectedQuestion = _.find(this.questions, (question: Question) => question.id == questionId);
    this.questonDetail.setQuestion(questionId, this.selectedQuestion, this.answers[questionId]);
  }

  onResetWeek() {
    if (window.confirm("Naozaj chceš všetkým resetovať body?")) { 
      this._dataService.resetWeek();
    }
  }

  onResetTimesFailed() {
    if (window.confirm("Naozaj chceš resetovať počítadlo neúspešných odpovedí pre všetky otázky?")) { 
      this._dataService.resetTimesFailed();
    }
  }

}
