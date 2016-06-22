import { provideRouter, RouterConfig } from '@angular/router';
import { IntroScreenComponent } from './intro-screen/';
import { MenuScreenComponent } from './menu-screen/';
import { RulesScreenComponent } from './rules-screen/';
import { PrizesScreenComponent } from './prizes-screen/';
import { QuestionsScreenComponent } from './questions-screen/';
import { ResultsScreenComponent } from './results-screen/';
import { SigninScreenComponent } from './signin-screen/';

export const routes: RouterConfig = [
  { path: '', component: IntroScreenComponent },
  { path: 'menu', component: MenuScreenComponent },
  { path: 'pravidla', component: RulesScreenComponent },
  { path: 'vyhry', component: PrizesScreenComponent },
  { path: 'kviz', component: QuestionsScreenComponent },
  { path: 'vysledky', component: ResultsScreenComponent },
  { path: 'sign-in', component: SigninScreenComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
