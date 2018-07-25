import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createAndroidMode = false;
  createJobMode = false;
  editedAndroid;
  editAndroidMode = false;

  constructor() {
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
  }

  onEnableJobCreate() {
    this.createJobMode = true;
  }

  onDisableJobCreate() {
    this.createJobMode = false;
  }

  onCancelCreation() {
    this.editAndroidMode = false;
    this.createAndroidMode = false;

  }
}
