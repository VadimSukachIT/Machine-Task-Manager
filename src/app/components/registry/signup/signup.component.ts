import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errMsg;
  isErr;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  ngOnInit() {

  }

  async onSubmit(form) {
    const {email, password, confirmPassword} = form.value;

    if (form.valid) {
      if (password.match(confirmPassword)) {
        await this.authService.registerUser(email, password).catch(err => {
          this.isErr = true;
          this.errMsg = err.error;
          if (err.error.includes('duplicate key')) {
            this.errMsg = 'Account already exists';
          }
        });
      }
    }
  }
}
