import { provideRouter, RouterConfig } from '@angular/router';
import { IntroScreenComponent } from './intro-screen/';
import { MenuScreenComponent } from './menu-screen/';
import { RulesScreenComponent } from './rules-screen/';
import { PrizesScreenComponent } from './prizes-screen/';
import { QuestionsScreenComponent } from './questions-screen/';
import { ResultsScreenComponent } from './results-screen/';
import { AuthGuard } from './shared/auth.guard/';

export const routes: RouterConfig = [
  { path: '', component: IntroScreenComponent },
  { path: 'menu', component: MenuScreenComponent, canActivate: [AuthGuard] },
  { path: 'pravidla', component: RulesScreenComponent, canActivate: [AuthGuard] },
  { path: 'vyhry', component: PrizesScreenComponent, canActivate: [AuthGuard] },
  { path: 'kviz', component: QuestionsScreenComponent, canActivate: [AuthGuard] },
  { path: 'vysledky', component: ResultsScreenComponent, canActivate: [AuthGuard] }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
