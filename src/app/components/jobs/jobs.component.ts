import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {JobsService} from "../../services/jobs.service";
import {Subscription} from "rxjs/internal/Subscription";
import {AssignService} from "../../services/assign.service";

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  jobs;
  subscription: Subscription;

  @Output() onJobEdit = new EventEmitter<{}>();


  constructor(private jobService: JobsService, private assignService: AssignService) {
    this.subscription = this.assignService.getAssign().subscribe(async ({android, job}) => {
      this.jobs = this.jobs;
    });
  }

  async ngOnInit() {
    await this.jobService.loadJobs().then(jobs => {
      this.jobs = jobs;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEnableEdit(job) {
    this.onJobEdit.emit(job);

  }

  async onDelete(id) {
    this.jobs = await this.jobService.deleteJob(id);
  }

}
