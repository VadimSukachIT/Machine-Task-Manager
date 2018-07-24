import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {reject} from "q";

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  isAuthenticated() {
    return localStorage.getItem('authToken') !== null
  }

  async registerUser(email, password) {
    return new Promise(async (res, rej) => {
      const req = this.httpClient.post('http://localhost:3000/api/users', {email, password}).subscribe((response) => {
        console.log('Усешно зарегался');
        this.login(email, password).then(() => {
          res()
        });
      }, error1 => {
        console.log(error1);
        rej(error1);
      })
    })
  }

  login(email, password) {
    return new Promise((res, rej) => {
      this.httpClient.post('http://localhost:3000/api/users/login', {
        email,
        password,
      }, {
        observe: 'response',
      }).subscribe((response) => {
        localStorage.setItem('authToken', response.body['token']);
        this.router.navigate(['/androids']);
        res();
      }, error1 => {
        console.log(error1);
        rej(error1);
      })
    })
  }
}
