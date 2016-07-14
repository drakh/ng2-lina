import { provideRouter, RouterConfig } from '@angular/router';
import { IntroScreenComponent } from './intro-screen/';
import { MenuScreenComponent } from './menu-screen/';
import { RulesScreenComponent } from './rules-screen/';
import { PrizesScreenComponent } from './prizes-screen/';
import { QuestionsScreenComponent } from './questions-screen/';
import { ResultsScreenComponent } from './results-screen/';
import { GameoverScreenComponent } from './gameover-screen/';
import { AdminScreenComponent } from './admin-screen/';

import { BasicAuthGuard, AdminAuthGuard } from './shared/auth.guard/';

export const routes: RouterConfig = [
  { path: '', component: IntroScreenComponent },
  { path: 'menu', component: MenuScreenComponent, canActivate: [BasicAuthGuard] },
  { path: 'pravidla', component: RulesScreenComponent, canActivate: [BasicAuthGuard] },
  { path: 'vyhry', component: PrizesScreenComponent, canActivate: [BasicAuthGuard] },
  { path: 'kviz', component: QuestionsScreenComponent, canActivate: [BasicAuthGuard] },
  { path: 'vysledky', component: ResultsScreenComponent, canActivate: [BasicAuthGuard] },
  { path: 'gameover/:howFinished', component: GameoverScreenComponent, canActivate: [BasicAuthGuard] },
  { path: 'admin', component: AdminScreenComponent, canActivate: [AdminAuthGuard] },
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
