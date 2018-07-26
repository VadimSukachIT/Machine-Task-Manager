import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AndroidService} from "../../../../services/android.service";

@Component({
  selector: 'app-android-edit',
  templateUrl: './android-edit.component.html',
  styleUrls: ['./android-edit.component.css']
})
export class AndroidEditComponent implements OnInit {
  @Input() android;
  @Output() cancelCreation = new EventEmitter<void>();
  @ViewChild('name') nameInput;
  @ViewChild('form') myForm;
  skills;
  newAndroid;


  constructor(private androidService: AndroidService) {
  }

  ngOnInit() {
    this.skills = this.android.skills;
    this.skills.forEach(el => {
      this.androidService.addSkill(el)
    });
    this.newAndroid = this.android;
  }


  async onSubmit(form) {
    if (form.valid) {
      if (form.value.name !== '') {
        this.newAndroid.name = form.value.name;
      }
      this.newAndroid.skills = this.androidService.getSkills();
      await this.androidService.updateAndroid(this.newAndroid);
      this.androidService.clearSkills();
      this.cancelCreation.emit();
    }

  }

  onCancelCreation() {
    this.cancelCreation.emit();
    this.androidService.clearSkills();
  }

}
