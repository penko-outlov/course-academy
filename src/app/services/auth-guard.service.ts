import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (!localStorage.getItem('user')) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }
}
