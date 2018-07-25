import {Component, EventEmitter, OnInit, Output} from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  onEnableAndroidCreate() {
    this.enableAndroidCreate.emit();
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
