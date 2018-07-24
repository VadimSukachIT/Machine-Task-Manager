import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {JobsComponent} from './components/jobs/jobs.component';
import {JobComponent} from './components/jobs/job/job.component';
import {AndroidsComponent} from './components/androids/androids.component';
import {AndroidComponent} from './components/androids/android/android.component';
import {AppRoutingModule} from "./app-routing.module";

import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "./components/registry/signup/signup.component";
import {AuthService} from "./services/auth.service";
import { SigninComponent } from './components/registry/signin/signin.component';
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { HeaderComponent } from './components/header/header.component';
import {AndroidService} from "./services/android.service";
import {JobsService} from "./services/jobs.service";
import { AndroidCreateComponent } from './components/androids/android/android-create/android-create.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobComponent,
    AndroidsComponent,
    AndroidComponent,
    SignupComponent,
    SigninComponent,
    CompareValidatorDirective,
    HeaderComponent,
    AndroidCreateComponent,
    HomeComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ AuthService, AndroidService, JobsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
