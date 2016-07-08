import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AuthService } from "./shared/";

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
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
  	this._changeDetectorRef.detach();
  	this.changeDetectorInterval = setInterval(() => {
      this._changeDetectorRef.detectChanges();
    }, 500);

  }
}
