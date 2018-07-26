import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AndroidService} from "../../services/android.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() enableAndroidCreate = new EventEmitter<void>();
  @Output() enableJobCreate = new EventEmitter<void>();
  @Output() disableAndroidCreate = new EventEmitter<void>();
  @Output() disableJobCreate = new EventEmitter<void>();

  constructor(private androidService: AndroidService) { }

  ngOnInit() {
  }

  onEnableAndroidCreate() {
    this.enableAndroidCreate.emit();
    this.androidService.clearSkills();
  }

  onDisableAndroidCreate() {
    this.disableAndroidCreate.emit();

  }

  onDisableJobCreate() {
    this.disableJobCreate.emit();
  }

  onEnableJobCreate() {
    this.enableJobCreate.emit();
  }
}
