import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { RegisterComponent } from './components/register/register.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { CourseCreateComponent } from './components/course/course-create/course-create.component';
import { CourseEditComponent } from './components/course/course-edit/course-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { FavoritesComponent } from './components/user/favorites/favorites.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'course/create', component: CourseCreateComponent, canActivate: [AdminGuardService] },
  { path: 'course/:courseId', component: CourseEditComponent, canActivate: [AdminGuardService] },
  { path: 'users', component: UserListComponent, canActivate: [AdminGuardService]  },
  { path: 'user/create', component: UserCreateComponent, canActivate: [AdminGuardService] },
  { path: 'user/:userId', component: UserEditComponent, canActivate: [AdminGuardService] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    CourseListComponent,
    CourseCreateComponent,
    CourseEditComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
