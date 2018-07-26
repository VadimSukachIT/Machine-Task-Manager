import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignService} from "../../../services/assign.service";
import {JobsService} from "../../../services/jobs.service";
import {Subscription} from "rxjs/internal/Subscription";

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
  assignedJobName = '';
  subscription: Subscription;

  @Output() onDeleteAndroid = new EventEmitter<string>();
  @Output() onEnableEditMode = new EventEmitter<{}>();


  constructor(private assignService: AssignService, private jobService: JobsService) {
  }

  ngOnInit() {
    const job = this.jobService.getJobById(this.android.assignedJob);
    if (job !== null) {
      this.assignedJobName = job.name;
    }
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
