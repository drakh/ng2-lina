import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, User } from '../shared/';
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

  constructor(
    private _router: Router,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.users = [];

    console.log(typeof this.selectedUser);

    this._dataService.users$()
      .subscribe({
        next: (userData: User) => { this.users.push(userData) },
        error: error => console.error(error),
        complete: () => { this.handleUsers() }
      });
  }

  onNavigate(destination: String) {
    this._router.navigate([`/${destination}`]);
  }

  /** 
  * Sorts users list and populate new user list filtered by topScore
  */
  handleUsers() {
    this.users = _.sortBy(this.users, 'highScore').reverse();
    this.topScore = this.users[0].highScore;
    this.users = _.sortBy(this.users, 'displayName');
    this.topScoreUsers = this.users.filter(userData => userData.highScore === this.topScore);
  }

  onDraw() {
    this._dataService.randomNumber$(this.topScoreUsers.length-1).subscribe({
      next: (response: Response) => {
        this.drawResult = <number>response.json().result.random.data[0];
        console.log(`Picked random number between 0 and ${this.topScoreUsers.length-1}: ${this.drawResult}.`);
      }
    });
  }

  onUserSelect(event) {
    console.log(typeof event);
    this.selectedUser = _.find(this.users, (user: User) => user.uid == event.target.dataset.uid);
  }

  onResetWeek() {
    this._dataService.resetWeek$().subscribe({
      next: () => {}
    });
  }

}
