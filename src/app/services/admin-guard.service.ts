import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isAdmin) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }
}
