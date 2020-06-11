import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: UserModel;
  editUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    await this.fetchUser();
    await this.createEditUserForm();
  }

  async editUser() {
    this.user.firstName = this.firstName.value;
    this.user.lastName = this.lastName.value;
    this.user.password = this.password.value;
    await this.userService.update(this.user);
  }

  private async fetchUser() {
    const userId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('userId'));
    this.user = await this.userService.getById(userId);
  }

  private async createEditUserForm() {
    this.editUserForm = this.formBuilder.group({
      email: [this.user.email],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }

  get firstName() { return this.editUserForm.get('firstName'); }

  get lastName() { return this.editUserForm.get('lastName'); }

  get password() { return this.editUserForm.get('password'); }
}
