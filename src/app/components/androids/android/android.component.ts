import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AndroidService} from "../../../services/android.service";

@Component({
  selector: 'app-android',
  templateUrl: './android.component.html',
  styleUrls: ['./android.component.css']
})
export class AndroidComponent implements OnInit {
 @Input() android: {
    name: string,
    status: boolean,
    assignedJob: string,
    assignedJobComplexity: string,
    avatar: string,
    reliability: number
  };

  @Output() onDeleteAndroid = new EventEmitter<string>();



  constructor(private androidService: AndroidService) { }

  ngOnInit() {

  }

  onDelete(android) {
    this.onDeleteAndroid.emit(android._id);
  }
}
