import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserModel[];

  constructor(private userService: UserService) { }

  async ngOnInit() {
    await this.fetchUsers();
  }

  async blockUser(userId: number) {
    await this.userService.blockUserById(userId);
  }

  async deleteUser(userId: number) {
    await this.userService.removeById(userId);
    this.users = this.users.filter(user => user.id !== userId);
  }

  private async fetchUsers() {
    this.users = await this.userService.getAll();
  }
}
