import { Injectable }             from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    // Not using but worth knowing about
    next:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isAuthenticated()) { return true; }
    this.router.navigate(['/']);
    return false;
  }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    // Not using but worth knowing about
    next:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    }
    else if (this.authService.isAuthenticated()) {
      this.router.navigate(['/menu']);
      return false;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }
}