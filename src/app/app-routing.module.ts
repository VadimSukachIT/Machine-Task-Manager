import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AndroidsComponent} from "./components/androids/androids.component";
import {SignupComponent} from "./components/registry/signup/signup.component";
import {SigninComponent} from "./components/registry/signin/signin.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {JobsComponent} from "./components/jobs/jobs.component";
import {AppComponent} from "./app.component";
import {AndroidCreateComponent} from "./components/androids/android/android-create/android-create.component";
import {HomeComponent} from "./components/home/home.component";


const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: '**', redirectTo: '/androids'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
