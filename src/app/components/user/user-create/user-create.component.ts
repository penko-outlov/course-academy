import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user/user.model';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) form;
  createUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    await this.createEditUserForm();
  }

  async createUser() {
    const user: UserModel = {
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      password: this. password.value,
      isActive: true,
      isAdmin: false
    };
    await this.userService.create(user);

    this.form.resetForm();
  }

  private async createEditUserForm() {
    this.createUserForm = this.formBuilder.group({
      email: ['', Validators.email],
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  get email() { return this.createUserForm.get('email'); }

  get firstName() { return this.createUserForm.get('firstName'); }

  get lastName() { return this.createUserForm.get('lastName'); }

  get password() { return this.createUserForm.get('password'); }
}
