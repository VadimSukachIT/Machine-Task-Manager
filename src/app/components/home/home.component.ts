import {Component, OnInit} from '@angular/core';
import {AndroidService} from "../../services/android.service";
import {AssignService} from "../../services/assign.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createAndroidMode = false;
  createJobMode = false;
  editJobMode = false;
  editedAndroid;
  editAndroidMode = false;
  editedJob;
  subscription: Subscription;
  assignMode = false;

  constructor(private androidService: AndroidService, private assignService: AssignService) {
    this.subscription = this.assignService.getMode().subscribe((mode) => {
      this.assignMode = !!mode;
      this.onDisableJobCreate();
    });
  }



  ngOnInit() {
  }

  onAndroidEdit(android) {
    this.editAndroidMode = true;
    this.editedAndroid = android;
  }

  onEnableAndroidCreate() {
    this.editAndroidMode = false;
    this.createAndroidMode = true;
  }

  onDisableAndroidCreate() {
    this.editAndroidMode = false;
    this.createAndroidMode = false;
    this.androidService.clearSkills();

  }


  onEnableJobCreate() {
    this.createJobMode = true;
    this.editJobMode = false;
  }

  onDisableJobCreate() {
    this.editJobMode = false;
    this.createJobMode = false;
  }

  onCancelCreation() {
    this.editAndroidMode = false;
    this.createAndroidMode = false;
    this.androidService.clearSkills();
  }

  onEnableJobEdit(job) {
    this.editedJob = job;
    this.createJobMode = false;
    this.editJobMode = true;
  }
}
