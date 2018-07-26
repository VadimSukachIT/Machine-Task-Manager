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


  constructor(private androidService: AndroidService) {
  }

  ngOnInit() {
  }

  async onSubmit(form) {
    if (form.valid) {
      this.android = {
        name: form.value.name,
        skills: this.androidService.getSkills()
      };
      await this.androidService.createAndroid(this.android);
      this.androidService.clearSkills();
      this.cancelCreation.emit();
    }
  }

  onCancelCreation() {
    this.cancelCreation.emit();
    this.androidService.clearSkills()
  }
}
