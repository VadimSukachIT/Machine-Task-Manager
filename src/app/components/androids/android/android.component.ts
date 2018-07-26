import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AndroidService} from "../../../services/android.service";
import {AssignService} from "../../../services/assign.service";

@Component({
  selector: 'app-android',
  templateUrl: './android.component.html',
  styleUrls: ['./android.component.css']
})
export class AndroidComponent implements OnInit {
 @Input() android;
   // : {
 //    name: string,
 //    status: boolean,
 //    assignedJob: {
 //      name: string,
 //      complexityLevel: string
 //    }
 //    avatar: string,
 //    reliability: number,
 //   skills: string[];
 //  };

  @Output() onDeleteAndroid = new EventEmitter<string>();
  @Output() onEnableEditMode = new EventEmitter<{}>();



  constructor(private assignService: AssignService) { }

  ngOnInit() {

  }

  onEnableEdit() {
    this.onEnableEditMode.emit(this.android);
  }

  onDelete(android) {
    this.onDeleteAndroid.emit(android._id);
  }

  startAssign() {
    this.assignService.changeMode(true);
    this.assignService.saveAndroid(this.android);
  }
}
