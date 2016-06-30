import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';
import { AuthGuard, AuthService, DataService, ProgressService } from './app/shared/';

// if (environment.production) {
  enableProdMode();
// }

const AUTH_PROVIDERS = [AuthGuard, AuthService];

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  AUTH_PROVIDERS,
  DataService,
  ProgressService
])
.catch(err => console.error(err));

