import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-android-edit',
  templateUrl: './android-edit.component.html',
  styleUrls: ['./android-edit.component.css']
})
export class AndroidEditComponent implements OnInit {
  @Input() android;
  @Output() cancelCreation = new EventEmitter<void>();
  @ViewChild('name') nameInput;

  constructor() { }

  ngOnInit() {
    this.nameInput.nativeElement.value = this.android.name;
  }

  onCancelCreation() {
    this.cancelCreation.emit();
  }

}
