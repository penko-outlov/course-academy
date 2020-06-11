import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  @ViewChild(FormGroupDirective, { static: false }) form;
  logInForm: FormGroup;
  invalidCredentials: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.createLogInForm();
  }

  async logIn() {
    const user: UserModel = (await this.userService.getByEmail(this.email.value))[0];
    if (user && user.isActive && user.password === this.password.value) {
      localStorage.setItem('user', JSON.stringify({ userId: user.id, isAdmin: user.isAdmin }));
      this.router.navigateByUrl('/courses');
      this.invalidCredentials = false;
    } else {
      this.invalidCredentials = true;
    }

    this.form.resetForm();
  }

  private createLogInForm() {
    this.logInForm = this.formBuilder.group({
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  get email() { return this.logInForm.get('email'); }

  get password() { return this.logInForm.get('password'); }
}
