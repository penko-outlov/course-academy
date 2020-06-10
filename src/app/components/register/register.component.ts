import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) form;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
    this.createRegisterForm();
  }

  ngOnInit() {
  }

  async registerUser() {
    const persistedUser: UserModel = await this.userService.getByEmail(this.email.value);
    if (!persistedUser.email) {
      const user: UserModel = {
        email: this.email.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        isAdmin: false,
        isActive: true
      };
      await this.userService.create(user);
    }

    this.form.resetForm();
  }

  private createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      repeatPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  get email() { return this.registerForm.get('email'); }

  get password() { return this.registerForm.get('password'); }

  get repeatPassword() { return this.registerForm.get('repeatPassword'); }

  get firstName() { return this.registerForm.get('firstName'); }

  get lastName() { return this.registerForm.get('lastName'); }
}
