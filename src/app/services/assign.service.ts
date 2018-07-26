import {Injectable} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class AssignService {
  android;
  job;
  mode = false;
  private subject = new Subject<any>();
  private subjectMode = new Subject<any>();

  constructor() {
  }

  saveAndroid(android) {
    this.android = android;
  }

  getAndroid(){
    return this.android;
  }

  saveJob(job) {
    this.job = job;
  }

  getJob() {
    return this.job;
  }

  sendAssign() {
    this.subject.next({android: this.android, job: this.job});
  }

  getAssign(): Observable<any> {
    return this.subject.asObservable();
  }

  changeMode(mode) {
    this.mode = mode;
    this.subjectMode.next(mode);
  }

  getMode(): Observable<any> {
    return this.subjectMode.asObservable();
  }

  getCurrentMode() {
    return this.mode;
  }
}
