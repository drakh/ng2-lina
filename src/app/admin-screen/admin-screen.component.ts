import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, User, Question } from '../shared/';
import { Response } from '@angular/http';

import  'rxjs/Rx';
import { Observable } from "rxjs/Observable";

declare var _: any;

@Component({
  moduleId: module.id,
  selector: 'app-admin-screen',
  templateUrl: 'admin-screen.component.html',
  styleUrls: ['admin-screen.component.css']
})
export class AdminScreenComponent implements OnInit {

  private users: Array<User>;
  private selectedUser: User;
  private topScoreUsers: Array<User>;
  private topScore: number;
  private drawResult: number;
  private randomNumbers: Array<number>;

  private questions: Array<Question>;

  constructor(
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.initUsers();
    this.initQuestions();
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
          this.questions = _.sortBy(allQuestions, 'timesFailed').reverse();
        },
        error: error => console.error(error),
      });
  }

  onUserSelect(event) {
    this.selectedUser = _.find(this.users, (user: User) => user.uid == event.target.dataset.uid);
  }

  onResetWeek() {
    if (window.confirm("Naozaj chceš všetkým resetovať body?")) { 
      this._dataService.resetWeek();
    }
  }

}
