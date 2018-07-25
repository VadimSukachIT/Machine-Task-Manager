import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AndroidService} from "../../../../services/android.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-android-create',
  templateUrl: './android-create.component.html',
  styleUrls: ['./android-create.component.css']
})
export class AndroidCreateComponent implements OnInit {
  @Output() cancelCreation = new EventEmitter<void>();
  android;


  constructor(private androidService: AndroidService, httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  onSubmit(form) {
    if (form.valid) {
      this.android = {
        name: form.value.name,
        skills: this.androidService.getSkills()
      };
      this.androidService.addAndroid(this.android);
      this.androidService.clearSkills();
    }
  }

  onCancelCreation() {
    this.cancelCreation.emit();
  }
}
