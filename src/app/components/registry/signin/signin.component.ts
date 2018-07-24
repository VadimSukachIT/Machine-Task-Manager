import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  wrongData = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  async onSubmit(form) {
    const {email, password, confirmPassword} = form.value;

    if (form.valid) {
      if (password.match(confirmPassword)) {
        await this.authService.login(email, password).catch(err => {
          this.wrongData = true;
        });

      }
    }
  }
}
