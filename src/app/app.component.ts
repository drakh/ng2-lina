import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DatabaseService } from "./shared/";

declare var firebase: any;

@Component({
  moduleId: module.id,
  selector: 'lina-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent implements OnInit {

  private debugMessages: Array<string>;
  protected changeDetectorInterval: any;

  constructor(
    private _databaseService: DatabaseService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this._databaseService.initConfigData();
    this._databaseService.initializeApp();

  	this._changeDetectorRef.detach();
  	this.changeDetectorInterval = setInterval(() => {
      this._changeDetectorRef.detectChanges();
    }, 500);
  }
}
