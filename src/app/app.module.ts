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

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'log-in', component: LogInComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent
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
