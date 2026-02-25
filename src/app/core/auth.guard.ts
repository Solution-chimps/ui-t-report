import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';

import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private readonly router = inject(Router)
  public canActivate(): MaybeAsync<GuardResult> {
    if (!User.isUserLoggedIn()) {
      this.router.navigateByUrl('/auth');
      return false
    }
    return true
  }

}
