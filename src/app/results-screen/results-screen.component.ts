import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, User } from '../shared/';

declare var jQuery: any;
declare var _: any;

@Component({
  moduleId: module.id,
  selector: 'lina-results-screen',
  templateUrl: 'results-screen.component.html',
  styleUrls: ['results-screen.component.css']
})
export class ResultsScreenComponent implements OnInit {

  private users: Array<User>;
  private changeDetectorInterval: any;

  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    jQuery('body').addClass('empty').removeClass('squirrel');

    this.changeDetectorInterval = setInterval(() => {
      this._changeDetectorRef.detectChanges();
    }, 1000);

    this._dataService.allUsers$()
      .subscribe({
        next: (allUsersData) => this.handleUsers(allUsersData)
      });
  }

  ngOnDestroy() {
    clearInterval(this.changeDetectorInterval);
    this._changeDetectorRef = null;
  }

  onNavigate(destination: String) {
    this._router.navigate([`/${destination}`]);
  }

  handleUsers(allUsersData) {
    this.users = [];
    _.map(allUsersData, (userData: User) => this.users.push(userData));    
    this.users = _.sortBy(this.users, 'highScore');
    this.users = this.users.reverse();
  }

}
