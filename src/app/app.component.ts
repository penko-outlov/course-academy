import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  logOut() {
    localStorage.removeItem('user');
  }

  userIsPresent(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      return user.length > 0;
    }
    return false;
  }

  userIsAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return false;
    }
    return user.isAdmin;
  }
}
