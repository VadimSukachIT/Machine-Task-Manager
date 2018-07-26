import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssignService} from "../../../services/assign.service";
import {AndroidService} from "../../../services/android.service";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  @Output() onEnableJobEditMode = new EventEmitter<{}>();
  @Output() onDeleteJob = new EventEmitter<string>();
  @Input() job;

  constructor(private assignService: AssignService, private androidService: AndroidService) {

  }

  ngOnInit() {
    this.job.assignedAndroids = this.androidService.getAndroidById(this.job);
  }

  onEnableJobEdit() {
    this.onEnableJobEditMode.emit(this.job);
  }

  onDelete(job) {
    this.onDeleteJob.emit(job._id);
  }

  onTarget() {
    if (this.assignService.getCurrentMode()) {
      this.assignService.saveJob(this.job);
      this.assignService.sendAssign();
    }
  }
}
