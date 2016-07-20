import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import { BasicAuthGuard, AdminAuthGuard, AuthService, DatabaseService, DataService, ProgressService } from './app/shared/';


if (environment.production) {
  enableProdMode();
}

const AUTH_PROVIDERS = [BasicAuthGuard, AdminAuthGuard, AuthService];

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  DatabaseService,
  AUTH_PROVIDERS,
  // { provide: LocationStrategy, useClass: HashLocationStrategy },
  DataService,
  ProgressService
])
.catch(err => console.error(err));

